const userInfoContainer = document.getElementById("userInfoContainer");
const prfleContainer = document.getElementById("profileContainer");
const confrmedCartCntainer= document.getElementById("confrmedCartCntainer");
const taxTotal = document.getElementById("taxTotal");
const purchsdProductHeader = document.getElementById("purchasedProductsHeader")
function loadConfirm(user) {;
  let userImage = document.getElementById("confirmProfileImg");
  userImage.src = user.image;
  prfleContainer.appendChild(userImage);
  for (const [key, value] of Object.entries(user)) {
    let unwanted = ["id", "mode", "password", "image", "cartItems", "address", "receipts"]
    if(key != unwanted[0] && key != unwanted[1] && key != unwanted[2] && key != unwanted[3] && key != unwanted[4] && key != unwanted[5] && key != unwanted[6]){
      let profileInfoElement = document.createElement("p");
      profileInfoElement.innerText = `${key}: ${value}`
      userInfoContainer.appendChild(profileInfoElement)
    }
  }
  const userReceipts = user.receipts;
  curReceipt = userReceipts[userReceipts.length-1]
  const cartItems = curReceipt.purchased;
  let overallTotal = document.getElementById("overallTotal")
  tempTotal = 0;
  cartItems.forEach(item => {
    tempTotal += item.price * item.amount;
  });
  taxTotal.innerText = `$${(tempTotal / 10).toFixed(2)}`;
  overallTotal.innerText = `$${tempTotal.toFixed(2)}`;
  let tempAddress = "";
  for (const [key, value] of Object.entries(user.address)) {
    if (key == "postCode") {
      tempAddress += `${value}`
    } else if (key !== "line2" && key !== "message") {
      tempAddress += `${value}, `
    }
    
  }
  let idHeader = document.createElement("h3");
  idHeader.innerText = `Receipt ID: ${curReceipt.id}`;
  confrmedCartCntainer.appendChild(idHeader);
  let timeHeader = document.createElement("h3");
  tempTime = curReceipt.time.split('T')[1].split('.')[0].split(':')
  timeHeader.innerText = `Date: ${curReceipt.time.split('T')[0]} Time: ${tempTime[0]}:${tempTime[1]}`;
  confrmedCartCntainer.appendChild(timeHeader);
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
    for (const [key, value] of Object.entries(cartItems[i])) {
      if (key != "id" && key != "discountPercentage"){
        if (key == "title") {
          let eachCartData = document.createElement("p");
          eachCartData.className = "font-thin h-12";
          eachCartData.innerText = `${value} `;
          eachCartContainer.appendChild(eachCartData);
        } else if (key == "thumbnail") {
          let eachCartImage = document.createElement("img");
          eachCartImage.className = "cart-img h-40 row-span-2";
          eachCartImage.src = value;
          eachCartContainer.appendChild(eachCartImage);
        } else if (key == "description") {
          let eachCartData = document.createElement("p");
          eachCartData.className = "font-thin col-span-4 text-center text-xl";
          eachCartData.innerText = value;
          eachCartContainer.appendChild(eachCartData);
        } else if (key == "price") {
          let eachCartData = document.createElement("p");
          eachCartData.className = "font-thin h-12";
          eachCartData.innerText = `${key}: $${value}`;
          eachCartContainer.appendChild(eachCartData);
        } else {
          let eachCartData = document.createElement("p");
          eachCartData.className = "font-thin h-12";
          eachCartData.innerText = `${key}: ${value}`;
          eachCartContainer.appendChild(eachCartData);
        }
      }
    }
    confrmedCartCntainer.appendChild(eachCartContainer);
  }
}

function preload() {
  if (localStorage.getItem("user") == null) {
    window.open("login.html?redirect=pay", "_self");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  user.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  loadConfirm(user)
}