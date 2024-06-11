let fetchDataService = {
    getImg: async function(add){
        try {
            let res = await fetch(add)
            let data = await res.json()
            
            return [...data]

        } catch (error) {
            console.log(error)
        }
    }
}

const createCardsService = {
    divShowingCards: document.getElementById("cardContainer"),
    cardsDefault: async function(add){
        const data = await fetchDataService.getImg(add)
        this.createCards(data)
        
        categoriesService.addAscEvent(data)
        categoriesService.addDescEvent(data)
        
    },
    filterImages: async function(add, inputCategory){
        const data = await fetchDataService.getImg(add)
        console.log(data)
        const filteredData = data.filter(item=> item.category === inputCategory )
        this.createCards(filteredData)
        const arrayToBeSorted = [...filteredData]
        categoriesService.addAscEvent(arrayToBeSorted)
        categoriesService.addDescEvent(arrayToBeSorted)

    },
    createCards: function(data){
        createCardsService.divShowingCards.innerHTML = " ";
        for (let i = 0; i < data.length; i++) {
            this.divShowingCards.innerHTML += `
             <article class="card">
                <img
                class="card__background"
                src=${data[i].imageUrl}
                alt=${data[i].type}
                width="1920"
                height="2193"/>
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
        
        addToCartService.addEventsAddToCart()
        const arrayToBeSorted = [...data]
        categoriesService.addAscEvent(arrayToBeSorted)
        categoriesService.addDescEvent(arrayToBeSorted)
    }
}

const categoriesService = {
    categorySelect: document.getElementById("categorySelect"),
    submitBtn: document.getElementById("submit"),
    addSubmitEvent: function(){
        this.submitBtn.addEventListener("click",function(){
            createCardsService.divShowingCards.innerHTML = ""
            if(categoriesService.categorySelect.value === "default"){
                createCardsService.cardsDefault(url)
            }else{
                console.log(categoriesService.categorySelect.value)
                createCardsService.filterImages(url, categoriesService.categorySelect.value)
            }
        })
        
    },
    ascendingBtn: document.getElementById("lowToHigh"),
    descendingBtn: document.getElementById("highToLow"),
    addAscEvent: function(data){
        this.ascendingBtn.addEventListener("click", function(){
            const arraySorted = data.sort(function(a,b){return a.price-b.price});
            createCardsService.createCards(arraySorted)
        })
    },
    addDescEvent: function(data){
        this.descendingBtn.addEventListener("click", function(){
            const arraySorted = data.sort(function(a,b){return b.price-a.price})
            createCardsService.createCards(arraySorted)
        })
    }
    
}



const searchInputService = {
    searchInput: document.getElementById("searchInput"),
      addSearchEvent: this.searchInput.addEventListener("keydown",async function(event){
            if(event.code === 'Enter'){
                const searchedItems= await searchInputService.searchDB(url)
                searchInputService.searchInput.value = '';
                if(searchedItems.length==0){
                    const divNoItems = document.getElementById("noItemsFound")
                    divNoItems.style.display = "block"
                    setTimeout(()=>{divNoItems.style.display = "none"}, 4000)
                    await createCardsService.cardsDefault(url)
                }else{
                  createCardsService.createCards(searchedItems)
                }
            }
        }),
    searchDB: async function(URl){
        const data = await fetchDataService.getImg(URl)
        const result = data.filter(item=>{
              if(item.tags.find(str=> str==searchInputService.searchInput.value)){
                  return item
              }
        })
        return result
    }
  
}


const addToCartService = {
    addToCartBtn : document.getElementsByClassName("card__button"),
    addEventsAddToCart: function (){
        for(let button of this.addToCartBtn){
            button.addEventListener("click", function(event){
                event.preventDefault()
                localStorageService.imageID.ids.push(button.getAttribute('id'))
                localStorageService.addToLocalStorage()
                
            })
        }
        
    }
}

const localStorageService = {
    imageID: {ids:[]},
    addToLocalStorage: function(){
        localStorage.setItem("imageID", JSON.stringify(this.imageID))
    }
}

const promptInputService = {
    prompt: document.getElementById("promptInput"),
    addPromptEvent: function(){
        this.prompt.addEventListener("click", function(){
            document.location.href = "./singUp.html"
        })
    }
}

//TO DO 
// const popUpImagesService = {
//     imgButtons : document.getElementsByClassName("card__button"),
//     addEventsImgButtons: function (){
//         for(let button of this.imgButtons){
//             button.addEventListener("click", function(event){
//                 event.preventDefault()
//             console.log("clicked")
//             })
//         }
        
//     }
// }




const url = 'https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/feature/T8/category-page/DropshippingStore/images.json'
createCardsService.cardsDefault(url) //presenting all images
categoriesService.addSubmitEvent()
promptInputService.addPromptEvent() //redirect to singUp page
