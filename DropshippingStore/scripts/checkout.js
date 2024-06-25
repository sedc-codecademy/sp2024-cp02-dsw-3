document.querySelector(".form").addEventListener("submit", function (event) {
  validateForm(event);
});

document.getElementById("closeWindow").addEventListener("click", function () {
  closeWindow();
});

document.getElementById("okButton").addEventListener("click", function () {
  closeWindow();
});

function validateForm(event) {
  event.preventDefault();
  let isValid = true;
  const fields = [
    "fname",
    "email",
    "city",
    "state",
    "zip",
    "cname",
    "ccnum",
    "expdate",
    "cvv",
  ];
  const errors = {
    fname: "Full Name is required",
    email: "Valid Email is required",
    city: "City is required",
    state: "State is required",
    zip: "Valid Zip is required",
    cname: "Name on card is required",
    ccnum: "Valid Credit card number is required",
    expdate: "Valid Expiry Date is required",
    cvv: "Valid CVV is required",
  };

  fields.forEach((field) => {
    const value = document.getElementById(field).value;
    const errorDiv = document.getElementById(`${field}Error`);

    errorDiv.innerHTML = "";

    if (
      !value ||
      (field === "email" && !validateEmail(value)) ||
      (field === "zip" && !/^\d{4}$/.test(value)) ||
      (field === "ccnum" && !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value)) ||
      (field === "expdate" && !/^\d{2}\/\d{2}$/.test(value)) ||
      (field === "cvv" && !/^\d{3}$/.test(value))
    ) {
      errorDiv.innerHTML = errors[field];
      isValid = false;
    }
  });

  if (isValid) {
    document.getElementById("successWindow").style.display = "block";
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function closeWindow() {
  document.getElementById("successWindow").style.display = "none";
  document.querySelector(".form").reset();
}
