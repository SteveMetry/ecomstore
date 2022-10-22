const postalform = document.getElementById("postalForm")
const formInputs = postalform.elements;
if (localStorage.getItem("user") == null) {
  window.open("login.html?redirect=pay", "_self");
}
const user = JSON.parse(localStorage.getItem("user"));
const loginData = JSON.parse(localStorage.getItem("login"));
const userCart = JSON.parse(localStorage.getItem("cartItems"))
let isAddress = false;
isAddress = user.address['line1'].trim() !== "";
if (isAddress) {
  for (const [key, value] of Object.entries(user.address)) {
    formInputs[`${key}`].value = value;
  }
}

function isInfoSet(infoKey, infoType, infoInput) {
  let isValid = false;
  switch (infoType) {
    case 'number':
      isValid = infoInput.trim() !== "" && !isNaN(infoInput.trim());
      if (isValid) {
        return true;
      }
      return false;
    default:
      isValid = infoInput.trim() !== "";
      if (isValid) {
        if (infoKey == "suburb" && isValid !== isNaN(infoInput.trim())) {
          return false
        }
        return true;
      }
      return false;
  }
}

function savePostal() {
  for (const [key, value] of Object.entries(user.address)) {
    user.address[key] = formInputs[`${key}`].value.trim();
  }
  loginData.forEach(item => {
    if (user.id === item.id) {
      item.address = user.address;
    }
  });
}  

function validatePostalAddress() {
  const isline1Valid = isInfoSet('line1',formInputs['line1'].type, formInputs['line1'].value);
  document.getElementById("line1Error").style.display = isline1Valid ? 'none' : 'block';
  // const isline2Valid = isInfoSet('line2',formInputs['line2'].type, formInputs['line2'].value);
  // document.getElementById("line2Error").style.display = isline2Valid ? 'none' : 'block';
  const isPostCodeValid = isInfoSet('postCode',formInputs['postCode'].type, formInputs['postCode'].value);
  document.getElementById("postCodeError").style.display = isPostCodeValid ? 'none' : 'block';
  const isSuburbValid = isInfoSet('suburb',formInputs['suburb'].type, formInputs['suburb'].value);
  document.getElementById("suburbError").style.display = isSuburbValid ? 'none' : 'block';
  const isCityValid = isInfoSet('city',formInputs['city'].type, formInputs['city'].value);
  document.getElementById("cityError").style.display = isCityValid ? 'none' : 'block';
  let allValid = isline1Valid  && isPostCodeValid && isSuburbValid && isCityValid;
  const emptyCartNotification = document.getElementById("emptyCartNotification");
  if (userCart.length !== 0 && allValid){
    document.getElementById("emptyCartNotification").classList.add("hide");
    savePostal()
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("login", JSON.stringify(loginData));
    window.open("confirm.html", "_self");
  } else if(allValid) {
    savePostal()
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("login", JSON.stringify(loginData));
    document.getElementById("emptyCartNotification").classList.toggle("hide");
  }
}