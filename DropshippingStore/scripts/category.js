import { LocalStorageService } from "./classLS.js"

document.addEventListener("DOMContentLoaded", function(){
    createCardsService.cardsDefault() 
    imageFilterService.listenToCategoryFilter();
    imageFilterService.listenToStockFilter();
    searchInputService.addSearchEvent()
    itemsInCart.displayItems()
})

let fetchDataService = {
    getImg: async function(){
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
let currentPage = 1
let items = 12
const createCardsService = {
    divShowingCards : document.getElementById("cardContainer"),
    pageNumber: document.getElementById("pagination"),
    cardsDefault: async function(){
        const data = await fetchDataService.getImg()
        const copyData = [...data]
        gallery.addImagesInGallery(copyData)
        console.log(data)
        await this.createCards(data, items,currentPage)
        categoriesService.addAscEvent(data)
        categoriesService.addDescEvent(data)
        
    },
    createCards: async function(images,numOfImagesPerPage, page){
        this.divShowingCards.innerHTML = "";
        page--;
        let start = numOfImagesPerPage * page
        let end = start + numOfImagesPerPage 
        let pagginatedItems = images.slice(start, end)
        for(let i = 0; i< pagginatedItems.length; i++){

            this.divShowingCards.innerHTML += `
             <article class="card">
                <img
                class="card__background"
                src=${pagginatedItems[i].imageUrl}
                alt=${pagginatedItems[i].type}
                width="1920"
                height="2193"/>
                    <div class="card__content | flow">
                        <div class="card__content--container | flow">
                            <p class="card__description">${pagginatedItems[i].category}</p>
                            <p class="img-price">${pagginatedItems[i].price}$</p>
                            <button class="card__button" id=${pagginatedItems[i].id}>Add to cart</button>
                            <button class="details__button" id="${pagginatedItems[i].id}">Details</button>
                        </div>
                        
                    </div>
            </article> 
           
            `;
        }
        
        addToCartService.addEventsAddToCart()
        const arrayToBeSorted = [...images]
        categoriesService.addAscEvent(arrayToBeSorted)
        categoriesService.addDescEvent(arrayToBeSorted)
        this.setupPagination(images,this.pageNumber, items)
        popUpImagesService.addEventsImgButtons(images)//POP UP

    }, setupPagination(images, wrapper, numOfImagesPerPage){
        wrapper.innerHTML = ""
        let page_count = Math.ceil(images.length / numOfImagesPerPage)

        for( let i = 1; i<page_count +1; i++){
            let btn= this.paginationButton(i, images)
            wrapper.appendChild(btn)
        }
    },
    paginationButton: function(page, images){
        let button = document.createElement('button')
        button.innerText = page
        if(currentPage == page){
            button.classList.add("active")
        }
        button.addEventListener("click", function(){
            currentPage = page
            createCardsService.createCards(images, items, currentPage)
            let current_btn = document.querySelector('.page-numbers button.active')
            current_btn.classList.remove('active')
            button.classList.add('active')
            
        })
        return button
    }
    
}

const imageFilterService = {
    categoryFilter: document.getElementById("categorySelect"),
    stockFilter: document.getElementById("filterStock"),

    listenToCategoryFilter: () => {
        imageFilterService.categoryFilter.addEventListener("change", imageFilterService.filterImages)
    },
    listenToStockFilter: () => {
        imageFilterService.stockFilter.addEventListener("change", imageFilterService.filterImages)
    },


    filterImages: async () => {

        const images = await fetchDataService.getImg();
        const categoryFilter = imageFilterService.categoryFilter.value;
        const stockFilter = imageFilterService.stockFilter.value;

        let filteredImages = images;

        if (categoryFilter !== "default") {
            filteredImages = filteredImages.filter(image => image.category === categoryFilter);

        }

        if (stockFilter === "available") {
            filteredImages = filteredImages.filter(image => image.stock === true);
        }

        createCardsService.createCards(filteredImages,items,currentPage);
    }
};


const categoriesService = {
    categorySelect: document.getElementById("categorySelect"),
    ascendingBtn: document.getElementById("lowToHigh"),
    descendingBtn: document.getElementById("highToLow"),
    addAscEvent: function(data){
        this.ascendingBtn.addEventListener("click", function(){
            const arraySorted = data.sort(function(a,b){return a.price-b.price});
            createCardsService.createCards(arraySorted,items,currentPage)
        })
    },
    addDescEvent: function(data){
        this.descendingBtn.addEventListener("click", function(){
            const arraySorted = data.sort(function(a,b){return b.price-a.price})
            createCardsService.createCards(arraySorted,items,currentPage)
        })
    }
    
}



const searchInputService = {
    searchInput: document.getElementById("searchInput"),
      addSearchEvent: function (){
        if(this.searchInput){
            searchInputService.searchInput.addEventListener("keydown",async function(event){
                if(event.code === 'Enter'){
                    const searchedItems= await searchInputService.searchDB(url)
                    searchInputService.searchInput.value = '';
                    if(searchedItems.length==0){
                        const divNoItems = document.getElementById("noItemsFound")
                        divNoItems.style.display = "block"
                        setTimeout(()=>{divNoItems.style.display = "none"}, 4000)
                        await createCardsService.cardsDefault(url)
                    }else{
                      createCardsService.createCards(searchedItems,items, currentPage)
                    }
                }
            })
        }
        },
    searchDB: async function(){
        const data = await fetchDataService.getImg()
        const result = data.filter(item=>{
              if(item.tags.find(str=> str==searchInputService.searchInput.value)){
                  return item
              }
        })
        return result
    }
  
}
const storage = new LocalStorageService()

const addToCartService = {
    imageID: {ids:[]},
    addToCartBtn : document.getElementsByClassName("card__button"),
    addEventsAddToCart: function (){
        for(let button of this.addToCartBtn){
            button.addEventListener("click", function(event){
                event.preventDefault()
                let id = button.getAttribute('id')
                addToCartService.cartEvent(id)
                button.disabled = true               
            })
        }
        
    }, cartEvent: function(id){
        let str = storage.getFromLocalStorage("imageID")
        console.log(str.ids)
        if(!str.ids.find(i=> i == id)){
            addToCartService.imageID.ids.push(id)
            storage.setToLocalStorage("imageID", addToCartService.imageID)
            itemsInCart.displayItems()
        }
        
    }
}



const itemsInCart = {
    cart: document.getElementById("cart-count"),
    displayItems: function(){
        this.cart.innerText = `${storage.itemsInCart("imageID")}`
    }
}


const gallery = {
    galleryElement: document.getElementById("gallery"),
    addImagesInGallery: function(images){
        
        const arraySorted = images.sort(function(a,b){return b.price-a.price})
        
        for(let i = 0; i< arraySorted.length ; i++){
            this.galleryElement.innerHTML += `<div class="item item-${i}"><img src=${arraySorted[i].imageUrl} alt=${arraySorted[i].title} width="350" height="500"</div>`
            if(i==9){break}
        }
    }
}

//For PopUp
const popUpImagesService = {
    addEventsImgButtons: function(data) {
        const buttons = document.getElementsByClassName("details__button");
        for (let button of buttons) {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                const id = this.id;
                const imageData = data.find(item => item.id == id);
                if (imageData) {
                    showPopup(imageData);
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
    const btnDiv = document.getElementById('btnDiv')

    const stockStatus = imageData.stock ? 'Yes' : 'No';
    

    // Update the popup content
    popupText.innerHTML = `
        <strong>■ Category:</strong> ${imageData.category}<br><hr>
        <strong>■ Description:</strong> ${imageData.description}<br><hr>
        <strong>■ Artist:</strong> ${imageData.artist.userName}<br><hr>
        <strong>■ Price:</strong> $${imageData.price}<br><hr>
           <strong>■ In Stock:</strong> ${stockStatus}<br><hr>
    `;


    btnDiv.innerHTML = '<button class="add" id="add" >Add to cart</button>'

    document.getElementById('add').addEventListener("click", function(event){
        event.preventDefault()
        addToCartService.cartEvent(String(imageData.id))
        this.disabled = true
    })

    // Update the popup image
    popupImage.src = imageData.imageUrl;
    popupImage.alt = imageData.type;

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
