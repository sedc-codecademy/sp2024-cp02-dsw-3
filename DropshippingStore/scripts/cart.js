let items = [
  {
    id: "1",
    imageUrl:
      "https://img.freepik.com/free-photo/abstract-beauty-vibrant-colors-paints-sensuality-generated-by-ai_188544-30274.jpg?t=st=1716917774~exp=1716921374~hmac=f19eb64429cda8b0918ccebbd4db99d29c683ef9fab538324c93457be2882eb1&w=2000",
    category: "Acrylic",
    price: 10,
    discPrice: 7,
  },
  {
    id: "2",
    imageUrl:
      "https://img.freepik.com/free-photo/abstract-painting-grunge-canvas-texture-colorful-background-concept_53876-132509.jpg?w=2000",
    category: "Oil",
    price: 15,
    discPrice: 10,
  },
  {
    id: "3",
    imageUrl:
      "https://img.freepik.com/free-photo/abstract-beauty-vibrant-colors-paints-sensuality-generated-by-ai_188544-30274.jpg?t=st=1716917774~exp=1716921374~hmac=f19eb64429cda8b0918ccebbd4db99d29c683ef9fab538324c93457be2882eb1&w=2000",
    category: "Acrylic",
    price: 10,
    discPrice: null,
  },
  {
    id: "4",
    imageUrl:
      "https://img.freepik.com/free-photo/abstract-painting-grunge-canvas-texture-colorful-background-concept_53876-132509.jpg?w=2000",
    category: "Oil",
    price: 15,
    discPrice: null,
  },
];

localStorage.setItem("cart-items", JSON.stringify(items));
document.addEventListener("DOMContentLoaded", function () {
  const displayItems = document.getElementById("displayItems");
  const totalAmount = document.getElementById("totalAmount");
  let items = JSON.parse(localStorage.getItem("cart-items")) || [];
  function displayCartItems() {
    if (items.length > 0) {
      const itemsDisplay = items
        .map(
          (item, index) => `
                  <div class="cardItems">
                  <div class="cart-item-info" class="cartItemInfo">
                      <img src="${item.imageUrl}" alt="somePhoto" >
                      <div class="para"
                      <p>Category: ${item.category}</p>
                      ${
                        item.discPrice !== null
                          ? `<p>Discount Price: <span class="discounted-price">$${item.discPrice}</span></p>`
                          : `<p>Price: $${item.price}</p>`
                      }
                      </div>
                      </div>
                      <button class="deleteBtn" data-index="${index}">X</button>
                  </div>
              `
        )
        .join("");

      displayItems.innerHTML = itemsDisplay;
    } else {
      displayItems.innerHTML = '<p class="noItems">No items in the cart</p>';
    }

    calculateTotalAmount();
  }

  function calculateTotalAmount() {
    let total = items.reduce(
      (acc, item) =>
        item.discPrice !== null ? acc + item.discPrice : acc + item.price,
      0
    );
    totalAmount.innerHTML = `Total Amount: $${total.toFixed(2)}`;
  }

  displayCartItems();

  displayItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      deleteItem(index);
    }
  });

  function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem("cart-items", JSON.stringify(items));
    displayCartItems();
  }
});
document.getElementById("checkoutBtn").addEventListener("click", function () {
  window.location.href = "./checkout.html";
});
