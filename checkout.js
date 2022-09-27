const customModal = document.getElementById("customModal");
const overlay = document.getElementById("overlay");
const cartContainer = document.getElementById("cartContainer");
const cartPageContainer = document.getElementById("cartPageContainer");
const discountTotal = document.getElementById("discountTotal");
const taxTotal = document.getElementById("taxTotal");
const overallTotal = document.getElementById("overallTotal");
let tempTotal = 0;

function closeModal() {
  customModal.innerHTML = "";
  customModal.style.display = "none";
  overlay.style.display = "none";
  cartContainer.style.display = "none";
}

function calculateTotals() {
  const cartItemList = JSON.parse(localStorage.getItem("cartItems"));
  tempTotal = 0;
  cartItemList.forEach(item => {
    tempTotal += item.price * item.amount;
  });
  overallTotal.innerText = `$${tempTotal.toFixed(2)}`;
}

function deleteItem(cartItem) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItems = cartItems.filter(item => item.id !== cartItem.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.location.reload();
}

function chkoutLoad() {
  if (localStorage.getItem("user") != null) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    localStorage.setItem(user.id.toString(), JSON.stringify(user));
  }
  let starIcon = document.getElementById("starIcon");
  starIcon = starIcon.cloneNode(true);
  starIcon = starIcon.innerText;
  const cartItemList = JSON.parse(localStorage.getItem("cartItems"));
  for (let i = 0; i < cartItemList.length; i++) {
    let cartItem = document.createElement("div");
    cartItem.className = "cart-product";
    const closeIcon = document.getElementById("closeIcon").cloneNode(true);
    const cartRemoveProduct = document.createElement("button");
    cartRemoveProduct.onclick = () => deleteItem(cartItemList[i]);
    cartRemoveProduct.innerText = closeIcon.innerText;
    cartItem.appendChild(cartRemoveProduct);
    let cartItemTitle = document.createElement("h1");
    cartItemTitle.innerText = cartItemList[i].title;
    cartItemTitle.className = "font-thin";
    let cartItemPrice = document.createElement("p");
    cartItemPrice.innerText = "Only $" + cartItemList[i].price + " EACH!";
    cartItemPrice.className = "text-right pr-3 font-thin";
    let cartItemQuantity = document.createElement("p");
    cartItemQuantity.className="text-right font-thin";
    cartItemQuantity.innerText = "Quantity: " + cartItemList[i].amount + starIcon;
    let cartItemThumbnail = document.createElement("img");
    cartItemThumbnail.className = "cart-img mx-auto my-6";
    cartItemThumbnail.src = cartItemList[i].thumbnail;
    let cartItemTitleThumbnail = document.createElement("div")
    cartItemTitleThumbnail.className = "text-center text-xl";
    cartItemTitleThumbnail.appendChild(cartItemTitle);
    cartItemTitleThumbnail.appendChild(cartItemThumbnail);
    cartItem.appendChild(cartItemTitleThumbnail);
    let cartItemInfoContainer = document.createElement("div")
    cartItemInfoContainer.className="grid grid-cols-2";
    let cartItemDescription = document.createElement("p");
    cartItemDescription.className = "col-span-2 text-center p-3 tracking-tight";
    cartItemDescription.innerText = cartItemList[i].description;
    cartItemInfoContainer.appendChild(cartItemQuantity);
    cartItemInfoContainer.appendChild(cartItemPrice);
    cartItemInfoContainer.appendChild(cartItemDescription);
    cartItem.appendChild(cartItemInfoContainer);
    cartPageContainer.appendChild(cartItem);
  }
  calculateTotals();
  taxTotal.innerText = `$${(tempTotal / 10).toFixed(2)}`;
}
