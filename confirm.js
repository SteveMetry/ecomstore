const userInfoContainer = document.getElementById("userInfoContainer");
const prfleContainer = document.getElementById("profileContainer");
const confrmedCartCntainer= document.getElementById("confrmedCartCntainer");
const taxTotal = document.getElementById("taxTotal");
function loadConfirm(chngedUser) {
  chngedUser = JSON.parse(chngedUser);
  let userImage = document.getElementById("confirmProfileImg");
  userImage.src = chngedUser.image;
  prfleContainer.appendChild(userImage);
  for (const [key, value] of Object.entries(chngedUser)) {
    let unwanted = ["id", "mode", "password", "image", "cartItems"]
    if(key != unwanted[0] && key != unwanted[1] && key != unwanted[2] && key != unwanted[3] && key != unwanted[4] && key != unwanted[5]){
      let itemElement = document.createElement("p");
      itemElement.innerText = `${key}: ${value}`
      userInfoContainer.appendChild(itemElement)
    }
  }
  const cartItems = chngedUser.cartItems;
  let overallTotal = document.getElementById("overallTotal")
  const cartItemList = cartItems
  tempTotal = 0;
  cartItemList.forEach(item => {
    tempTotal += item.price * item.amount;
  });
  taxTotal.innerText = `$${(tempTotal / 10).toFixed(2)}`;
  overallTotal.innerText = `$${tempTotal.toFixed(2)}`;
  for(let i = 0; i < cartItems.length; i++){
    let eachCartContainer = document.createElement("div");
    eachCartContainer.className = "grid grid-cols-5 cart-product";
    for (const [key, value] of Object.entries(cartItems[i])) {
      if (key != "id" && key != "discountPercentage"){
        if (key == "thumbnail") {
          let eachCartImage = document.createElement("img");
          eachCartImage.className = "cart-img h-40 row-span-2";
          eachCartImage.src = value;
          eachCartContainer.appendChild(eachCartImage);
        } else if (key == "description") {
          let eachCartData = document.createElement("p");
          eachCartData.className = "font-thin col-span-4 text-center text-xl";
          eachCartData.innerText = `${key}: ${value}`;
          eachCartContainer.appendChild(eachCartData);
        } 
        else {
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
    window.open("login.html?redirect=confirm", "_self");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  user.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  localStorage.setItem(user.id.toString(), JSON.stringify(user));
  let chngedUser;
  chngedUser = localStorage.getItem(user.id.toString())
  loadConfirm(chngedUser)
}