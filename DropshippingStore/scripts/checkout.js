document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkoutForm");
  const successWindow = document.getElementById("successWindow");
  const closeWindowBtn = document.getElementById("closeWindow");
  const okButton = document.getElementById("okButton");

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    showSuccessWindow();
  });

  function showSuccessWindow() {
    successWindow.style.display = "block";
  }

  closeWindowBtn.addEventListener("click", function () {
    successWindow.style.display = "none";
    checkoutForm.reset();
  });

  okButton.addEventListener("click", function () {
    successWindow.style.display = "none";
    checkoutForm.reset();
  });
});
