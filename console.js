if (localStorage.getItem("user") == null) {
  window.open("login.html", "_self");
}
const navUsrSpan = document.getElementById("navUsrnameSpan");
const consoleContainer = document.getElementById("consoleContainer");
const profileContainer = document.getElementById("profileContainer");
const inputContainer = document.getElementById("inputContainer");
const navUsrnameDiv = document.getElementById("navUsrnameDiv");
navUsrnameDiv.appendChild(navUsrSpan);
const body = document.getElementById("body");
const editSpan = document.getElementById("editBtn");
const profileImg = document.getElementById("profileImg");
const inputKeys = ["username","password", "phone", "email","firstname","lastname", "age"];
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

function consoleLoad() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  userInfo.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  inputKeys.forEach(item => {
    createInput(item, userInfo[item]);
  });
  profileImg.src = userInfo.image;
  navUsrSpan.innerText = `${userInfo.firstname} ${userInfo.lastname}`;
}

function disableInput() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  inputKeys.forEach(item => {
    let inputBox = document.getElementById(`user${userInfo.id}-${item}`);
    inputBox.disabled = true;
  })
}

function onSave() {
  disableInput()
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const loginUsers = JSON.parse(localStorage.getItem("login"));
  const curUser = loginUsers.find(curUser => curUser.id === userInfo.id);
  inputKeys.forEach(item => {
    const curInputItem = document.getElementById(`user${userInfo.id}-${item}`);
    if (curInputItem.value !== userInfo[item].value) {
      userInfo[item] = curInputItem.value;
      curUser[item] = curInputItem.value;
    }
  });
  localStorage.setItem("user", JSON.stringify(userInfo));
  localStorage.setItem("login", JSON.stringify(loginUsers));
}

function createInput(key, value) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  let profileInput = document.createElement("input");
  profileInput.disabled = true;
  profileInput.id = `user${userInfo.id}-${key}`;
  profileInput.value = value;
  profileInput.onchange = () => {
    disableInput();
  }
  profileInput.className = "rounded-lg w-full ml-2 pl-2 border border-slate-200 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40";
  let editSpan = document.getElementById("editBtn");
  let editSpanClone = editSpan.cloneNode(true);
  let editFNSpan = document.createElement("span")
  editFNSpan.innerText = editSpanClone.innerText;
  editFNSpan.className = "cursor-pointer";
  editFNSpan.onclick = () => {
    profileInput.disabled = false;
    // profileContainer.onmouseleave = function() {disableInput()}; 
  }
  let usersFNameContainer = document.createElement("div");
  usersFNameContainer.className="input-container";
  usersFNameContainer.appendChild(editFNSpan);
  usersFNameContainer.appendChild(profileInput);
  inputContainer.appendChild(usersFNameContainer);
}

function openIndex() {
  window.open("index.html", "_self");
}

function openLogin() {
  localStorage.removeItem("user");
  window.open("login.html", "_self");
}

function clearLocal() {
  localStorage.clear();
  openLogin();
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
  if (allValid){
    savePostal()
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("login", JSON.stringify(loginData));
  } 
}