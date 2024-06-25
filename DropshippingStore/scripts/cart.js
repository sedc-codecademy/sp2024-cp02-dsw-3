document.addEventListener("DOMContentLoaded", function() {
    const displayItems = document.getElementById("displayItems");
    const totalAmount = document.getElementById("totalAmount");
    let items = JSON.parse(localStorage.getItem("cart-items")) || [];
    function displayCartItems() {
        if (items.length > 0) {
            const itemsDisplay = items.map((item, index) => `
                <div class="cardItems">
                    <h1>ID: ${item.id}</h1>
                    <p>Category: ${item.category}</p>
                    <p>Price: ${item.price}</p>
                    <img src="${item.imageUrl}" alt="somePhoto" width="25%">
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                </div>
            `).join("");

            displayItems.innerHTML = itemsDisplay;
        } else {
            displayItems.innerHTML = "<p>No items in the cart</p>";
        }

        calculateTotalAmount();
    }

    function calculateTotalAmount() {
        let total = items.reduce((acc, item) => acc + item.price, 0);
        totalAmount.innerHTML = `Total Amount: $${total.toFixed(2)}`;
    }

    displayCartItems();

    displayItems.addEventListener("click", function(event) {
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
