const postalform = document.getElementById("postalForm")
if (localStorage.getItem("user") == null) {
  window.open("login.html?redirect=pay", "_self");
}

function isInfoSet(infoType, infoInput) {
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
        return true;
      }
      return false;
  }
}

function validatePostalAddress() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginData = JSON.parse(localStorage.getItem("login"));
  const formInputs = postalform.elements;
  const isline1Valid = isInfoSet(formInputs['line1'].type, formInputs['line1'].value);
  document.getElementById("line1Error").style.display = isline1Valid ? 'none' : 'block';
  // const isline2Valid = isInfoSet(formInputs['line2'].type, formInputs['line2'].value);
  // document.getElementById("line2Error").style.display = isline2Valid ? 'none' : 'block';
  const isPostCodeValid = isInfoSet(formInputs['postCode'].type, formInputs['postCode'].value);
  document.getElementById("postCodeError").style.display = isPostCodeValid ? 'none' : 'block';
  const isSuburbValid = isInfoSet(formInputs['suburb'].type, formInputs['suburb'].value);
  document.getElementById("suburbError").style.display = isSuburbValid ? 'none' : 'block';
  const isCityValid = isInfoSet(formInputs['city'].type, formInputs['city'].value);
  document.getElementById("cityError").style.display = isCityValid ? 'none' : 'block';
  let allValid = isline1Valid  && isPostCodeValid && isSuburbValid && isCityValid;
  if (allValid) {
    for (const [key, value] of Object.entries(user.address)) {
      user.address[key] = formInputs[`${key}`].value.trim();
    }
    loginData.forEach(item => {
      if (user.id === item.id) {
        item.address = user.address;
      }
    });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("login", JSON.stringify(loginData));
    window.open("confirm.html", "_self");
  }
}