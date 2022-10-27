const userInfoContainer = document.getElementById("userInfoContainer");
const prfleContainer = document.getElementById("profileContainer");
const confrmedCartCntainer= document.getElementById("confrmedCartCntainer");
const taxTotal = document.getElementById("taxTotal");
const purchsdProductHeader = document.getElementById("purchasedProductsHeader")

function loadConfirm(user) {
  let userImage = document.getElementById("confirmProfileImg");
  userImage.src = user.image;
  prfleContainer.appendChild(userImage);
  for (const [key, value] of Object.entries(user)) {
    let unwanted = ["id", "mode", "password", "image", "cartItems", "address", "receipts"];
    if(key != unwanted[0] && key != unwanted[1] && key != unwanted[2] && key != unwanted[3] && key != unwanted[4] && key != unwanted[5] && key != unwanted[6]){
      let profileInfoElement = document.createElement("p");
      profileInfoElement.innerText = `${key}: ${value}`;
      userInfoContainer.appendChild(profileInfoElement);
    }
  }
  const userReceipts = user.receipts;
  curReceipt = userReceipts[userReceipts.length-1];
  const cartItems = curReceipt.purchased;
  let overallTotal = document.getElementById("overallTotal");
  tempTotal = 0;
  cartItems.forEach(item => {
    tempTotal += item.price * item.amount;
  });
  taxTotal.innerText = `$${(tempTotal / 10).toFixed(2)}`;
  overallTotal.innerText = `$${tempTotal.toFixed(2)}`;
  let tempAddress = "";
  for (const [key, value] of Object.entries(curReceipt.user.address)) {
    if (key == "postCode") {
      tempAddress += `${value}`;
    } else if (key !== "line2" && key !== "message") {
      tempAddress += `${value}, `;
    }
  }
  let idHeader = document.createElement("h3");
  idHeader.innerText = `Receipt ID: ${curReceipt.id}`;
  confrmedCartCntainer.appendChild(idHeader);
  let timeHeader = document.createElement("h3");
  tempTime = curReceipt.time.split('T')[1].split('.')[0].split(':');
  timeHeader.innerText = `Date: ${curReceipt.time.split('T')[0]} Time: ${tempTime[0]}:${tempTime[1]}`;
  confrmedCartCntainer.appendChild(timeHeader);
  let totalHeader = document.createElement("h3");
  totalHeader.innerText = `Total: $${curReceipt.total}`;
  confrmedCartCntainer.appendChild(totalHeader);
  for (const [key, value] of Object.entries(curReceipt.user)) { 
    let keyHeader = document.createElement("h3");
    keyHeader.innerText = `${key}: ${value}`;
    confrmedCartCntainer.appendChild(keyHeader);
  }
  purchsdProductHeader.className = "border-t-2 solid";
  confrmedCartCntainer.appendChild(purchsdProductHeader)
  for(let i = 0; i < cartItems.length; i++){
    let eachCartContainer = document.createElement("div");
    eachCartContainer.className = "grid grid-cols-5 cart-product bg-white";
    let eachCartTitle = document.createElement("p");
    eachCartTitle.className = "font-thin h-12";
    eachCartTitle.innerText = cartItems[i].title;
    eachCartContainer.appendChild(eachCartTitle);
    let eachCartCategory = document.createElement("p");
    eachCartCategory.className = "font-thin h-12";
    eachCartCategory.innerText = `Category: ${cartItems[i].category}`;
    eachCartContainer.appendChild(eachCartCategory);
    let eachCartAmount = document.createElement("p");
    eachCartAmount.className = "font-thin h-12";
    eachCartAmount.innerText = `Amount: ${cartItems[i].amount}`;
    eachCartContainer.appendChild(eachCartAmount);
    let eachCartPrice = document.createElement("p");
    eachCartPrice.className = "font-thin h-12";
    eachCartPrice.innerText = `Price: $${cartItems[i].price}`;
    eachCartContainer.appendChild(eachCartPrice);
    let eachCartImage = document.createElement("img");
    eachCartImage.className = "cart-img h-40 row-span-2";
    eachCartImage.src = cartItems[i].thumbnail;
    eachCartContainer.appendChild(eachCartImage);
    let eachCartDescription = document.createElement("p");
    eachCartDescription.className = "font-thin col-span-4 text-center text-xl";
    eachCartDescription.innerText = cartItems[i].description;
    eachCartContainer.appendChild(eachCartDescription);
    confrmedCartCntainer.appendChild(eachCartContainer);
  }
}

function preload() {
  if (localStorage.getItem("user") == null) {
    window.open("login.html?redirect=pay", "_self");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  user.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  loadConfirm(user);
}