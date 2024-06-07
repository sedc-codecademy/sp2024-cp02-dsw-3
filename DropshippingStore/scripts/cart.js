
// function setToLocalStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// };

function getFromLocalStorage(key){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('../products.json');
        const data = await response.json();
        const products = data.products;
        // setToLocalStorage("shooping-cart", products)
        displayCart(products);
        displayAmount(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchAndDisplayProducts();
getFromLocalStorage("key");

let cart = [];


function displayCart(cart) {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class= "emptyCart">Your cart is empty.</p>';
    } else {
        const cartHTML = cart.map((item, index) => {
            return `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.description}">
                    <div class="cart-item-info" class="cartItemInfo">
                        <p>${item.description}</p>
                        <p>Category: ${item.category}</p>
                        <h6>Price: $${item.price}</h3>
                    </div>
                    <button type="button" class="delete-btn" data-index="${index}">X</button>

                </div>`;
        }).join('');
        cartItemsContainer.innerHTML = cartHTML;
    }

    cartItemsContainer.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.classList.contains('delete-btn')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            cart = cart.filter((item, idx) => idx !== index);
            displayCart(cart);
            displayAmount(cart)
            
        }
    });
}

function displayAmount(cart) {
    
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = cart.length === 0 ? 0 : 5; 
    const total = subtotal + shipping;

    const amountHTML = `
        <div class="summary-item">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Shipping:</span>
            <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;

    const amountContainer = document.querySelector('.cart-items');
    amountContainer.insertAdjacentHTML('beforeend', amountHTML);
}






 