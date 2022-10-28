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
const user = JSON.parse(localStorage.getItem("user"));
const loginData = JSON.parse(localStorage.getItem("login"));
const userCart = JSON.parse(localStorage.getItem("cartItems"))
const sidebarContainer = document.getElementById("sidebar")
const sidebarDivList = ["orderContainer", "profileContainer", "postalForm"];
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

function toggleSidebar() {
  sidebarContainer.classList.toggle("hide");
}

const orderContainer = document.getElementById("orderContainer");
const previewOrdersList = document.getElementById("previewOrdersList");
const previewCurOrder = document.getElementById("previewCurOrder");
const userReceipts = user.receipts;

function toggleReceiptContainer(receiptContainer, eachReceiptDiv) {
  for (let i = 0; i < receiptContainer.children.length; i++) {
    if (receiptContainer.children[i] == eachReceiptDiv){
    receiptContainer.children[i].classList.remove("hide");
    } else {
      receiptContainer.children[i].classList.add("hide");
    };
  };
}
function scrollDivRight(purchasedProductsContainer) {
  purchasedProductsContainer.scrollLeft += 600;
}
function scrollDivleft(purchasedProductsContainer) {
  purchasedProductsContainer.scrollLeft -= 600;
}

if (userReceipts.length > 0) {
  previewCurOrder.innerText = "";
  userReceipts.forEach((item, index) => {
    let eachReceiptButton = document.createElement("button");
    eachReceiptButton.innerText = `Order ${index + 1}`;
    previewOrdersList.appendChild(eachReceiptButton);
    let eachReceiptDiv = document.createElement("div");
    eachReceiptDiv.className=`${index != (userReceipts.length - 1) ? "receipt-container hide" : "receipt-container"}`;
    let idHeader = document.createElement("h3");
    idHeader.className = "receipt-header"
    idHeader.innerText = `Receipt ID: ${item.id}`;
    eachReceiptDiv.appendChild(idHeader);
    let timeHeader = document.createElement("h3");
    timeHeader.className = "receipt-header"
    tempTime = item.time.split('T')[1].split('.')[0].split(':');
    timeHeader.innerText = `Date: ${item.time.split('T')[0]} Time: ${tempTime[0]}:${tempTime[1]}`;
    eachReceiptDiv.appendChild(timeHeader);
    let totalHeader = document.createElement("h3");
    totalHeader.className = "receipt-header"
    totalHeader.innerText = `Total: $${item.total}`;
    eachReceiptDiv.appendChild(totalHeader);
    let totalProducts = document.createElement("h3");
    totalProducts.className = "receipt-header"
    totalProducts.innerText = `Total Products: ${item.purchased.map(curCartItem => curCartItem.amount).reduce((prevValue, curValue) => prevValue + curValue, 0)}`;
    eachReceiptDiv.appendChild(totalProducts);
    for (const [key, value] of Object.entries(item.user)) { 
      let keyHeader = document.createElement("h3");
      keyHeader.className = "receipt-header"
      keyHeader.innerText = `${key}: ${value}`;
      eachReceiptDiv.appendChild(keyHeader);
    };
    if (item.purchased.length > 1) {
      let receiptScrollButtons = document.createElement("div");
      receiptScrollButtons.className = "scroll-btns-container";
      let rightScrollButton = document.createElement("button");
      rightScrollButton.className = "scroll-btn";    
      rightScrollButton.onclick = () => { 
        scrollDivRight(purchasedProductsContainer)
      }
      rightScrollButton.innerText = document.getElementById("rightBtn").innerText
      let leftScrollButton = document.createElement("button");
      leftScrollButton.onclick = () => { 
        scrollDivleft(purchasedProductsContainer)
      }
      leftScrollButton.className = "scroll-btn";
      leftScrollButton.innerText = document.getElementById("leftBtn").innerText
      receiptScrollButtons.appendChild(leftScrollButton)
      receiptScrollButtons.appendChild(rightScrollButton)
      eachReceiptDiv.appendChild(receiptScrollButtons);
    }
    let productList = item.purchased;
    let purchasedProductsContainer = document.createElement("div")
    purchasedProductsContainer.className = "console-products";
    for (let i = 0; i < productList.length; i++) {
      let eachCartContainer = document.createElement("div");
      eachCartContainer.className = "console-product-card ml-11 mt-24 mr-24 mb-24 grid grid-cols-3";
      // eachCartContainer.className = "grid grid-cols-5 cart-product bg-white";
      let eachCartCategory = document.createElement("p");
      eachCartCategory.className = "font-thin h-12 justify-self-start";
      eachCartCategory.innerText = productList[i].category;
      eachCartContainer.appendChild(eachCartCategory);
      let eachCartAmount = document.createElement("p");
      eachCartAmount.className = "font-thin h-12";
      eachCartAmount.innerText = `Amount: ${productList[i].amount}`;
      eachCartContainer.appendChild(eachCartAmount);
      let eachCartPrice = document.createElement("p");
      eachCartPrice.className = "font-thin h-12 justify-self-end";
      eachCartPrice.innerText = `Price: $${productList[i].price * productList[i].amount}`;
      eachCartContainer.appendChild(eachCartPrice);
      let eachCartImage = document.createElement("img");
      eachCartImage.className = "cart-img my-4 h-40 col-span-3 m-auto";
      eachCartImage.src = productList[i].thumbnail;
      eachCartContainer.appendChild(eachCartImage);
      let eachCartTitle = document.createElement("p");
      eachCartTitle.className = " h-12 col-span-3 text-center";
      eachCartTitle.innerText = productList[i].title;
      eachCartContainer.appendChild(eachCartTitle);
      let eachCartDescription = document.createElement("p");
      eachCartDescription.className = "font-thin col-span-3 text-center text-xl";
      eachCartDescription.innerText = productList[i].description;
      eachCartContainer.appendChild(eachCartDescription);
      purchasedProductsContainer.appendChild(eachCartContainer);
    }
    eachReceiptDiv.appendChild(purchasedProductsContainer);
    // Order Button Onclick
    eachReceiptButton.onclick = () => { 
      toggleReceiptContainer(previewCurOrder, eachReceiptDiv);
    };
    previewCurOrder.appendChild(eachReceiptDiv);
  });
}

function toggleConsoleInfo(divName) {
  for (let i = 0; i < sidebarDivList.length; i++) {
    if (divName == sidebarDivList[i]) {
      document.getElementById(divName).classList.remove("hide");
    } else {
      document.getElementById(sidebarDivList[i]).classList.add("hide");
    };
  };
}
