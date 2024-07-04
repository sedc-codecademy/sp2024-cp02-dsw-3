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
