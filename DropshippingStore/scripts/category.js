let fetchDataService = {
    getImg: async function(add){
        try {
            let res = await fetch(add)
            let data = await res.json()
            console.log(data)
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
        for(let i = 0; i< data.length; i++){
            this.divShowingCards.innerHTML += `
            <div id="card">
            <img src=${data[i].imageUrl} alt=${data[i].type} srcset="" class="image">
            <div class="text">
                <p>${data[i].description}</p>
                <hr>

                <div class="img-details">
                <p>Price: ${data[i].price}$</p> 
                <img src="../icons/icon-cart-img.png" title="add to cart icons" class="addToCart">
                </div>
                
                
                
            </div>
            </div>
            `
        }
        
        
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


const url = 'https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/feature/T8/TN/MK/AS-develop-category-page-ui/DropshippingStore/images.json'
createCardsService.cardsDefault(url) //presenting all images
categoriesService.addSubmitEvent()
