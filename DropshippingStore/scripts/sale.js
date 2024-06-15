document.addEventListener("DOMContentLoaded", function() {
    function isAuthenticated() {
        return localStorage.getItem("user-creds") !== null;
    }

    if (!isAuthenticated()) {
        document.location.href = "./loginPage.html";
        return;
    }

    async function fetchImages(add) {
        try {
            let res = await fetch(add);
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
        divShowingCards.innerHTML = " ";
        for (let i = 0; i < data.length; i++) {
            if (data[i].onDiscount == true) {
                divShowingCards.innerHTML += `
                    <article class="card">
                    <div class="first">
                        <img
                            class="card__background"
                            src=${data[i].imageUrl}
                            alt=${data[i].type}
                            width="1920"
                            height="2193"/>
                            <div class="salePercentage">Sale - ${calculatePercentage(data[i].discPrice, data[i].price)}%</div>
                            </div>
                        <div class="card__content | flow">
                            <div class="card__content--container | flow">
                                <p class="card__description">${data[i].category}</p>
                                <p class="img-price">${data[i].price}$</p>
                                <button class="card__button" id=${data[i].id}>Add to cart</button>
                            </div>
                        </div>
                    </article> 
                `;
            }
        }

        addEventsAddToCart();
        AscBtn(data);
        DscBtn(data);
    }

    async function showDefaultCards(add) {
        const data = await fetchImages(add);
        createCards(data);
        AscBtn(data);
        DscBtn(data);
    }

    async function filterImages(add, inputCategory) {
        const data = await fetchImages(add);
        const filteredData = data.filter(item => item.category === inputCategory);
        createCards(filteredData);
        AscBtn(filteredData);
        DscBtn(filteredData);
    }

    function addSubmitEvent() {
        const submitBtn = document.getElementById("submit");
        const categorySelect = document.getElementById("categorySelect");

        submitBtn.addEventListener("click", function () {
            const divShowingCards = document.getElementById("cardContainer");
            divShowingCards.innerHTML = "";

            if (categorySelect.value === "default") {
                showDefaultCards(url);
            } else {
                filterImages(url, categorySelect.value);
            }
        });
    }

    function AscBtn(data) {
        const ascendingBtn = document.getElementById("lowToHigh");

        ascendingBtn.addEventListener("click", function () {
            const arraySorted = data.sort((a, b) => a.price - b.price);
            createCards(arraySorted);
        });
    }

    function DscBtn(data) {
        const descendingBtn = document.getElementById("highToLow");

        descendingBtn.addEventListener("click", function () {
            const arraySorted = data.sort((a, b) => b.price - a.price);
            createCards(arraySorted);
        });
    }

    function addSearchEvent() {
        const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("keydown", async function (event) {
            if (event.code === 'Enter') {
                const searchedItems = await searchDB(url);
                searchInput.value = '';

                if (searchedItems.length == 0) {
                    const divNoItems = document.getElementById("noItemsFound");
                    divNoItems.style.display = "block";
                    setTimeout(() => { divNoItems.style.display = "none" }, 4000);
                    await showDefaultCards(url);
                } else {
                    createCards(searchedItems);
                }
            }
        });
    }

    async function searchDB(url) {
        const data = await fetchImages(url);
        const searchInput = document.getElementById("searchInput").value;

        const result = data.filter(item => item.tags.includes(searchInput));
        return result;
    }

    function addEventsAddToCart() {
        const addToCartBtns = document.getElementsByClassName("card__button");

        for (let button of addToCartBtns) {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                const imageID = button.getAttribute('id');
                addToLocalStorage(imageID);
            });
        }
    }

    function addToLocalStorage(imageID) {
        const storedIDs = JSON.parse(localStorage.getItem("imageID")) || { ids: [] };
        storedIDs.ids.push(imageID);
        localStorage.setItem("imageID", JSON.stringify(storedIDs));
    }

    function addPromptEvent() {
        const prompt = document.getElementById("promptInput");

        prompt.addEventListener("click", function () {
            document.location.href = "./singUp.html";
        });
    }

    function displayUserCreds() {
        const userCreds = document.getElementById("userCreds");
        const storedData = JSON.parse(localStorage.getItem("user-creds"));
        console.log(storedData);
        userCreds.innerHTML += " " + storedData.fullName;
    }

    function logOut() {
        const logOutBtn = document.getElementById("logOut");
        logOutBtn.addEventListener('click', function () {
            localStorage.removeItem('user-creds');
            document.location.href = "./loginPage.html";
        });
    }

    const url = 'https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/feature/T8/category-page/DropshippingStore/images.json';
    logOut();
    showDefaultCards(url);
    addSubmitEvent();
    addPromptEvent();
    addSearchEvent();
    displayUserCreds();
});
