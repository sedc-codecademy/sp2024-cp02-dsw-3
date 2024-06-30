document.addEventListener('DOMContentLoaded', async function(){
    let data = await fetchDataService.getImg()
    let copyData = [...data]
    searchInputService.addSearchEvent(copyData)
    itemsInCart.displayItems()
})



const itemsInCart = {
    cart: document.getElementById("cart-count"),
    displayItems: function () {
        let storedCart = JSON.parse(localStorage.getItem("cart-items")) || []
        this.cart.textContent = storedCart.length;
        this.cart.style.display = storedCart.length > 0 ? 'block' : 'none';
    }
}

let fetchDataService = {
    getImg: async function () {
        try {
            let url = 'https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/feature/T8/category-page/DropshippingStore/images.json'
            let res = await fetch(url)
            let data = await res.json()

            return [...data]

        } catch (error) {
            console.log(error)
        }
    }
}

const createCardsService = {
    divShowingCards: document.getElementById("cardContainer"),
    createCards: function (images) {
        this.divShowingCards.innerHTML = "";
        this.divShowingCards.style.display = "grid"
        for (let i = 0; i < images.length; i++) {

            this.divShowingCards.innerHTML += `
             <article class="card" >
                <img
                class="card__background"
                src=${images[i].imageUrl}
                alt=${images[i].type}
                width="1920"
                height="2193"/>
                    <div class="card__content | flow" id='card__content'>
                        <div class="card__content--container | flow">
                            <p class="card__description">${images[i].category}</p>
                            <p class="img-price">${images[i].price}$</p>
                            <div class="buttonsContainer" id='${images[i].id}' data-item='${JSON.stringify(images[i])}'>
                                <p class="details__button"><img src='./icons/icons8-info-64.png' alt='info icon' width ='38'/></p>
                            </div>
                        </div>
                        
                    </div>
            </article> 
           
            `;

            if (images[i].stock == true) {
                let parentDiv = document.getElementById(`${images[i].id}`)
                parentDiv.innerHTML += `<p class="card__button"><img src="./icons/icons8-add-to-cart-48.png" alt="Add to cart" width ='38' ></p>`
            }

        }
        addToCartService.addEventsAddToCart()
        popUpImagesService.addEventsImgButtons()//POP UP

    }



}
const addToCartService = {
    addToCartBtn: document.getElementsByClassName("card__button"),
    addEventsAddToCart: function () {
        for (let button of this.addToCartBtn) {
            button.addEventListener("click", function (event) {
                event.preventDefault()
                let img = button.parentElement.getAttribute('data-item')
                let item = JSON.parse(img)
                addToCartService.cartEvent(item)
                button.style.display = "none"
            })
        }

    }, cartEvent: function (img) {
        let items = JSON.parse(localStorage.getItem("cart-items")) || []
        items.push(img)
        localStorage.setItem("cart-items", JSON.stringify(items))
        itemsInCart.displayItems()
        console.log(items)

    }
}
//For PopUp
const popUpImagesService = {
    addEventsImgButtons: function () {
        const buttons = document.getElementsByClassName("details__button");
        for (let button of buttons) {
            button.addEventListener("click",  function (event) {
                event.preventDefault();
                let item  = button.parentElement.getAttribute('data-item')
                console.log(item)
                let imageData = JSON.parse(item)
                console.log(imageData)
                if (imageData) {
                    showPopup(imageData);
                }
                let cardBtn = document.getElementById(`${imageData.id}`).children[1]
                if (imageData.stock === true && cardBtn.style.display!=='none') {
                    let btn = document.getElementById('add')
                    btn.style.display = "flex"
                    btn.addEventListener("click", function (event) {
                        event.preventDefault()
                        addToCartService.cartEvent(imageData)
                        cardBtn.style.display = 'none'
                        this.style.display = 'none'
                    })
                } else {
                    document.getElementById('add').style.display = "none"
                }
            });
        }
    }
};
//Pop up
function showPopup(imageData) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const popupClose = document.getElementById('popup-close');
    const popupImage = document.getElementById('popup-image');
    const popupHeader = document.getElementById('popup-header')
    const stockStatus = imageData.stock ? ' ✓' : ' ✘';

    // Update the popup image
    popupImage.src = imageData.imageUrl;
    popupImage.alt = imageData.type;
    // Update the popup content

    popupHeader.innerHTML = `<h3>${imageData.category}</h3>`
    popupText.innerHTML = `
        
        <p><span>■ Description:</span>  ${imageData.description}</p>
        <p><span>■ Artist:</span>  ${imageData.artist.userName}</p>
        <p><span>■ Price:</span>  ${imageData.price}$</p>
        <p><span>■ In Stock:</span>  ${stockStatus}</p>
    `;

    popup.classList.remove('hidden');
    popup.style.display = 'flex';

    popupClose.addEventListener('click', () => {
        popup.classList.add('hidden');
        popup.style.display = 'none';
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
            popup.style.display = 'none';
        }
    });

}
const searchInputService = {
    searchInput: document.getElementById("searchInput"),
    addSearchEvent: async function (data) {
        if (this.searchInput) {
            searchInputService.searchInput.addEventListener("keydown", async function (event) {
                if (event.code === 'Enter') {
                    const searchedItems = searchInputService.searchDB(data)
                    searchInputService.searchInput.value = '';
                    if (searchedItems.length == 0) {
                        const divNoItems = document.getElementById("noItemsFound")
                        divNoItems.style.display = "block"
                        setTimeout(() => { divNoItems.style.display = "none" }, 4000)
                    } else {
                        createCardsService.createCards(searchedItems)
                    }
                }
            })
        }
    },
    searchDB: function (data) {
        const result = data.filter(item => {
            if (item.tags.find(str => str == searchInputService.searchInput.value.toLowerCase() || str.includes(searchInputService.searchInput.value.toLowerCase()))) {
                return item
            }
        })
        return result
    }

}
