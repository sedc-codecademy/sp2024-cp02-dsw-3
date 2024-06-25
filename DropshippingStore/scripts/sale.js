document.addEventListener("DOMContentLoaded", function() {
    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let allData = [];
    const cartBadge = document.getElementById("cartBadge");

    function isAuthenticated() {
        return localStorage.getItem("user-creds") !== null;
    }

    if (!isAuthenticated()) {
        document.location.href = "./loginPage.html";
        return;
    }

    async function fetchImages(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            return [...data];
        } catch (error) {
            console.log(error);
        }
    }

    function calculatePercentage(part, whole) {
        return Math.round((part / whole) * 100);
    }

    function createCards(data) {
        const divShowingCards = document.getElementById("cardContainer");
        divShowingCards.innerHTML = "";
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageItems = data.slice(start, end);
        for (let i = 0; i < ITEMS_PER_PAGE; i++) {
            const item = pageItems[i];
            if (item) {
                divShowingCards.innerHTML += `
                    <article class="card">
                    <div class="first">
                        <img
                            class="card__background"
                            src=${item.imageUrl}
                            alt=${item.type}
                            width="1920"
                            height="2193"/>
                            <div class="salePercentage">Sale - ${calculatePercentage(item.discPrice, item.price)}%</div>
                    </div>
                    <div class="card__content | flow">
                        <div class="card__content--container | flow">
                            <p class="card__description">${item.category}</p>
                            <p class="img-price">${item.discPrice}$</p>
                            <button class="card__button" data-item='${JSON.stringify(item)}'>Add to cart</button>
                        </div>
                    </div>
                    </article>
                `;
            } else {
                continue;
            }
        }

        addEventsAddToCart();
        renderPaginationControls(data.length);
    }

    function renderPaginationControls(totalItems) {
        const paginationContainer = document.getElementById("paginationControls");
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-button");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }

            pageButton.addEventListener("click", function() {
                currentPage = i;
                createCards(allData);
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    async function showDefaultCards(url) {
        const data = await fetchImages(url);
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        allData = dataDiscount;
        createCards(dataDiscount);
    }

    async function filterImages(url, inputCategory) {
        const data = await fetchImages(url);
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        const filteredData = dataDiscount.filter(item => item.category === inputCategory);
        allData = filteredData;
        currentPage = 1;
        createCards(filteredData);
    }

    function addSubmitEvent() {
        const submitBtn = document.getElementById("submit");
        const categorySelect = document.getElementById("categorySelect");

        submitBtn.addEventListener("click", function() {
            const divShowingCards = document.getElementById("cardContainer");
            divShowingCards.innerHTML = "";
            currentPage = 1;

            if (categorySelect.value === "default") {
                showDefaultCards(url);
            } else {
                filterImages(url, categorySelect.value);
            }
        });
    }

    async function AscBtn(url) {
        const data = await fetchImages(url);
        const ascendingBtn = document.getElementById("lowToHigh");
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        ascendingBtn.addEventListener("click", function() {
            const arraySorted = [...dataDiscount].sort((a, b) => a.price - b.price);
            allData = arraySorted;
            currentPage = 1;
            createCards(arraySorted);
        });
    }

    async function DscBtn(url) {
        const data = await fetchImages(url);
        const descendingBtn = document.getElementById("highToLow");
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        descendingBtn.addEventListener("click", function() {
            const arraySorted = [...dataDiscount].sort((a, b) => b.price - a.price);
            allData = arraySorted;
            currentPage = 1;
            createCards(arraySorted);
        });
    }

    function addSearchEvent() {
        const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("keydown", async function(event) {
            if (event.code === 'Enter') {
                const searchedItems = await searchDB(url);
                searchInput.value = '';

                if (searchedItems.length == 0) {
                    const divNoItems = document.getElementById("noItemsFound");
                    divNoItems.style.display = "block";
                    setTimeout(() => { divNoItems.style.display = "none" }, 4000);
                    await showDefaultCards(url);
                } else {
                    allData = searchedItems;
                    currentPage = 1;
                    createCards(searchedItems);
                }
            }
        });
    }

    async function searchDB(url) {
        const data = await fetchImages(url);
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        const searchInput = document.getElementById("searchInput").value;

        const result = dataDiscount.filter(item => item.tags.includes(searchInput));
        return result;
    }

    function addEventsAddToCart() {
        const addToCartBtns = document.getElementsByClassName("card__button");

        for (let button of addToCartBtns) {
            button.addEventListener("click", async function(event) {
                event.preventDefault();
                const item = JSON.parse(event.target.getAttribute('data-item'));
                await addToCart(item);
                updateCartBadge();
                button.disabled = true;
                button.style.backgroundColor = "gray";
            });
        }
    }

    async function addToCart(item) {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart-items")) || [];
            storedCart.push(item);
            localStorage.setItem("cart-items", JSON.stringify(storedCart));
            console.log("Item added to cart:", item);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    function updateCartBadge() {
        const storedCart = JSON.parse(localStorage.getItem("cart-items")) || [];
        cartBadge.textContent = storedCart.length;
        cartBadge.style.display = storedCart.length > 0 ? 'block' : 'none';
    }

    function addPromptEvent() {
        const prompt = document.getElementById("promptInput");

        prompt.addEventListener("click", function() {
            document.location.href = "./singUp.html";
        });
    }

    function displayUserCreds() {
        const userCreds = document.getElementById("userCreds");
        const storedData = JSON.parse(localStorage.getItem("user-creds"));
        userCreds.innerHTML += " " + "<b>" + storedData.fullName + "</b>" + " " + "with email: " + "<b>" +storedData.email + "</b>";
    }
    const url = 'https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/feature/T8/category-page/DropshippingStore/images.json';
    showDefaultCards(url);
    addSubmitEvent();
    AscBtn(url);
    DscBtn(url);
    addSearchEvent();
    addPromptEvent();
    displayUserCreds();
    updateCartBadge();
});
