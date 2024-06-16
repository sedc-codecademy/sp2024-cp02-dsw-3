import LocalStorageService from "./localStorage.js";

const localSt = new LocalStorageService();

// test
const testIds = { ids: ["1", "2", "3"] };
localSt.setToLocalStorage("local", JSON.stringify(testIds));

const saleTest = { ids: ["4"] };
localSt.setToLocalStorage("sale", JSON.stringify(saleTest));

let cart = [];

//FETCH AND DISPLAY

async function fetchAndDisplayProducts() {
  try {
    let savedObj = localSt.getFromLocalStorage("local");
    let savedSaleObj = localSt.getFromLocalStorage("sale");

    let savedIds = savedObj ? JSON.parse(savedObj).ids : [];
    let saleSavedIds = savedSaleObj ? JSON.parse(savedSaleObj).ids : [];

    if (savedIds.length > 0 || saleSavedIds.length > 0) {
      const response = await fetch("../products.json");
      const data = await response.json();
      let products = data.products;

      cart = products.filter(
        (product) =>
          savedIds.includes(product.id.toString()) ||
          saleSavedIds.includes(product.id.toString())
      );
      console.log(cart);
      displayCart(cart);
      displayAmount(cart);
    } else {
      displayCart([]);
      displayAmount([]);
    }
  } catch (error) {
    console.log("Error fetching products", error);
  }
}

//DISPLAY CART

function displayCart(cart) {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class= "emptyCart">Your cart is empty.</p>';
  } else {
    const cartHTML = cart
      .map((item, index) => {
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
      })
      .join("");
    cartItemsContainer.innerHTML = cartHTML;
  }

  cartItemsContainer.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("delete-btn")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      cart = cart.filter((item, idx) => idx !== index);
      displayCart(cart);
      displayAmount(cart);
    }
  });
}

//DISPLAY AMOUNT

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

  const amountContainer = document.querySelector(".cart-items");
  amountContainer.insertAdjacentHTML("beforeend", amountHTML);
}

fetchAndDisplayProducts();
