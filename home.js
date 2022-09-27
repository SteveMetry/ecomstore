const customModal = document.getElementById("customModal");
const overlay = document.getElementById("overlay");
const productPage = document.getElementById("productCardsContainer");
const cartIcon = document.getElementById("cartIcon").cloneNode(true);
const pageHeader = document.getElementById("pageHeader");
const cartAmountSpan = document.getElementById("cartAmount");
const cartContainer = document.getElementById("cartContainer");
const cartProducts = document.getElementById("cartProducts");
const horizontalLine = document.createElement("hr");
const cartPageContainer = document.getElementById("cartPageContainer");
const categoriesContainer = document.getElementById("categoriesContainer");

function toggleCart(){
  cartContainer.style = "";
  overlay.style.display = ""
}

function closeModal() {
  customModal.innerHTML = "";
  customModal.style.display = "none";
  overlay.style.display = "none";
  cartContainer.style.display = "none";
}

function categoryBtns() {
  categoriesContainer.innerText = "";
    fetch(`https://dummyjson.com/products/categories`)
    .then((response) => response.json())
    .then((categories) => {
      for (let i = 0; i < categories.length; i++) {
        const categoryButton = document.createElement('button');
        categoryButton.onclick = () => onCategoryClick(categories[i]);
        categoryButton.innerText = categories[i];
        categoryButton.style.backgroundColor="#90999903";
        categoryButton.className = "category-button text-gray-700 leading-tight uppercase bg-slate-50 rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out";//bg-gray-200
        categoriesContainer.appendChild(categoryButton);
      }
    });
}

function onCategoryClick(category) {
  pageHeader.innerText = category;
  productPage.innerText = "";
  //fetch chosen information
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((response) => response.json())
    .then((results) => {
      resultProducts = results.products;
      for (let i = 0; i < resultProducts.length; i++) {
        // creating each product-card element & add element to productPage
        singleProduct(resultProducts[i]);
      }
    });
}

function populateCart(cartItem) {
  const cartProductTitle = document.createElement("h1");
  cartProductTitle.className="cart-title";
  cartProductTitle.innerText = cartItem.title;
  const cartProductPrice = document.createElement("p");
  cartProductPrice.className="cart-price";
  cartProductPrice.innerText = "$" + cartItem.price + " EACH";
  const cartProductQuantity = document.createElement("p");
  cartProductQuantity.innerText = `Quantity: ${cartItem.amount}`;
  const cartProductThumbnail = document.createElement("img");
  cartProductThumbnail.className="cart-thumbnail";
  cartProductThumbnail.src = cartItem.thumbnail;
  const cartProductInfoContainer = document.createElement("div");
  cartProductInfoContainer.className = "each-info-container";
  cartProductInfoContainer.appendChild(cartProductTitle);
  cartProductInfoContainer.appendChild(cartProductPrice);
  cartProductInfoContainer.appendChild(cartProductQuantity);
  const closeIcon = document.getElementById("closeIcon").cloneNode(true);
  const cartRemoveProduct = document.createElement("button");
  cartRemoveProduct.innerText = closeIcon.innerText;
  cartRemoveProduct.onclick = () => deleteItem(cartItem);
  const cartProductContainer = document.createElement("div");
  cartProductContainer.className = "each-cart-container";
  cartProductContainer.appendChild(cartRemoveProduct);
  cartProductContainer.appendChild(cartProductThumbnail);
  cartProductContainer.appendChild(cartProductInfoContainer);
  cartProducts.appendChild(cartProductContainer);
  cartProducts.appendChild(horizontalLine.cloneNode(true));
}

function deleteItem(cartItem) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItems = cartItems.filter(item => item.id !== cartItem.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  cartProducts.innerText = "";
  let totalAmount = 0;
  cartItems.forEach(item => {
    populateCart(item);
    totalAmount += item.amount;
  });
  if (totalAmount > 0) {
    cartAmountSpan.style = "";
    cartAmountSpan.innerText = totalAmount;
  } else {
    cartAmountSpan.style.display = "none";
    cartAmountSpan.innerText = "";
  }
}

function onLoad() {
  productPage.innerText = "";
  if (localStorage.getItem("productRandomList") == null) {
    localStorage.setItem("productRandomList", "[]");
    const productRandomList = JSON.parse(localStorage.getItem("productRandomList"));
    fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((productList) => {
        let productListTotal = (productList.total - 2);
        productPage.innerText = "";
        for(let i = 1; i <= 10; i++){   
          productRandomList[i] = Math.floor(Math.random() * productListTotal) + 2;
          localStorage.setItem("productRandomList", JSON.stringify(productRandomList));
          fetch(`https://dummyjson.com/products/${productRandomList[i]}`)
          .then((response) => response.json())
          .then((results) => {singleProduct(results);})
        }
      });
  } else {
    const productRandomList = JSON.parse(localStorage.getItem("productRandomList"));
    for(let i = 1; i <= 10; i++){
      fetch(`https://dummyjson.com/products/${productRandomList[i]}`)
        .then((response) => response.json())
        .then((results) => {
          singleProduct(results);
        });
    }
  }
  categoryBtns();
  if (localStorage.getItem("cartItems") == null) {
    localStorage.setItem("cartItems", "[]");
  } else {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let totalAmount = 0;
    cartItems.forEach(item => {
      populateCart(item);
      totalAmount += item.amount;
    });
    if (totalAmount > 0) {
      cartAmountSpan.style = "";
      cartAmountSpan.innerText = totalAmount;
    }
  }
}

function searchProducts()  {
  pageHeader.innerText = "";
  productPage.innerText = "";
  const userSearch = document.getElementById("userSearch").value;
  const searchPageHeader= document.createElement("h1");
  searchPageHeader.innerText = "Results for: " + userSearch;
  pageHeader.appendChild(searchPageHeader);
  //fetch chosen information
  fetch(`https://dummyjson.com/products/search?q=${userSearch}`)
    .then((response) => response.json())
    .then((searchResults) => {
      resultProducts = searchResults.products;
      for (let i = 0; i < resultProducts.length; i++) {
        singleProduct(resultProducts[i]);
      }
    });
}

function addToCartOnClick(resultProducts, productQuantitySelect) {
  let eachUser = JSON.parse(localStorage.getItem("user"));
  
  cartProducts.innerText = "";
  cartProducts.appendChild(horizontalLine.cloneNode(true));
  let cartAmount = 0;
  cartAmountSpan.style = "";
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const currentItem = cartItems.find(item => item.id === resultProducts.id);
  let userChsnQuantity = parseInt(productQuantitySelect.value);
  if (currentItem) {
    currentItem.amount += userChsnQuantity;
  } else {
    cartItems.push({
      id: resultProducts.id,
      title: "",
      amount: userChsnQuantity,
      price: 0,
      thumbnail: "",
      description: ""
    });
  };
  for (let i = 0; i < cartItems.length; i++) {
    cartAmount += cartItems[i].amount;
    fetch(`https://dummyjson.com/products/${cartItems[i].id}`)
      .then((response) => response.json())
      .then((aProduct) => {
        cartItems[i].title = aProduct.title;
        cartItems[i].price = parseInt(aProduct.price);
        cartItems[i].thumbnail = aProduct.thumbnail;
        cartItems[i].description = aProduct.description;
        populateCart(cartItems[i]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      });
  }
  
  cartAmountSpan.innerText = cartAmount;
  closeModal();
}

function singleProduct(resultProducts) {
  //creating each product-card element and attaching a class
  const eachProduct = document.createElement("div");
  const eachProductContainer = document.createElement("div");
  eachProductContainer.className = "product-container";  
  eachProduct.className = "each-product";    
  const eachProductBrand = document.createElement("h1");
  eachProductBrand.className = "capitalize product-brand";
  const eachProductThumbnail = document.createElement('img'); 
  eachProductThumbnail.className = "mx-auto product-thumbnail";
  const eachProductTitle = document.createElement("h2");
  eachProductTitle.className = "uppercase text-left product-title";
  const eachProductPrice = document.createElement("h2");
  eachProductPrice.className = "product-price";
  const eachProductTitlePrice = document.createElement("div");
  eachProductTitlePrice.appendChild(eachProductTitle);
  eachProductTitlePrice.appendChild(eachProductPrice);
  eachProductTitlePrice.className = "flex justify-between";
  const eachProductDescription = document.createElement("p");
  eachProductDescription.className = "product-description lowercase";
  const viewMoreButton = document.createElement('button');
  viewMoreButton.innerText = "Click Me";
  //inserting the information into the element
  eachProductTitle.innerText = resultProducts.title;
  eachProductDescription.innerText = resultProducts.description;
  eachProductPrice.innerText = `inc GST: $${resultProducts.price}`;
  eachProductBrand.innerText = resultProducts.brand;
  eachProductThumbnail.src = resultProducts.thumbnail;
  viewMoreButton.onclick = () => openModal(resultProducts, eachProductBrand, eachProductTitlePrice, eachProductThumbnail, eachProductDescription);
  //Appending the Children
  eachProduct.appendChild(eachProductThumbnail);
  eachProduct.appendChild(eachProductBrand);
  eachProduct.appendChild(eachProductTitlePrice);
  eachProduct.appendChild(eachProductDescription);
  eachProductContainer.appendChild(eachProduct);
  eachProductContainer.appendChild(viewMoreButton);
  productPage.appendChild(eachProductContainer);
}

function openModal(resultProducts, eachProductBrand, eachProductTitlePrice, eachProductThumbnail, eachProductDescription) {
  const eachProductStock = document.createElement("p");
  const eachProductRating = document.createElement("p");
  const modalBottom = document.createElement("div");
  const productAddToCartBtn = document.createElement("button");
  let productQuantitySelect = document.createElement("select");
  productQuantitySelect.className = "modal-select rounded p-1 mx-1";
  let stckNum =  resultProducts.stock;
  if (stckNum > 90){
    stckNum = stckNum / 4;
  }else if (stckNum > 30) {
    stckNum = stckNum / 2;
  }
  for (let i = 1; i <= stckNum; i++) {
    let productQuantityOption = document.createElement("option");
    productQuantityOption.value = i;
    productQuantityOption.innerText = i;
    productQuantitySelect.appendChild(productQuantityOption);
  }
  modalBottom.className="cart-container justify-between flex p-8";
  productAddToCartBtn.className="add-to-cart ";
  productAddToCartBtn.innerText="Add to Cart " + cartIcon.innerText;
  productAddToCartBtn.onclick = () => addToCartOnClick(resultProducts, productQuantitySelect);
  const eachProductCategory = document.createElement("p");
  eachProductStock.innerText = "Stock: " + resultProducts.stock + " LEFT IN STOCK!";
  const starIcon = document.getElementById("starIcon").cloneNode(true);
  eachProductRating.innerText = "Rating: " + resultProducts.rating + starIcon.innerText;
  eachProductCategory.innerText = "Category: " + resultProducts.category;
  const modalBrand = eachProductBrand.cloneNode(true);
  modalBrand.style.textAlign = "left";
  const closeButton = document.createElement("button");
  const closeIcon = document.getElementById("closeIcon").cloneNode(true);
  closeButton.innerText = closeIcon.innerText;
  closeButton.className = "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out";
  closeButton.style.padding = "10px 15px";
  closeButton.onclick = () => closeModal();
  const modalTop = document.createElement("div");
  modalTop.className = "flex justify-between items-center p-2";
  modalTop.appendChild(modalBrand);
  modalTop.appendChild(closeButton);
  customModal.appendChild(modalTop);
  const modalTitlePrice = eachProductTitlePrice.cloneNode(true);
  customModal.appendChild(modalTitlePrice);
  const modalThumbnail = eachProductThumbnail.cloneNode(true);
  customModal.appendChild(modalThumbnail);
  const modalDescription = eachProductDescription.cloneNode(true);
  customModal.appendChild(modalDescription);
  customModal.appendChild(eachProductStock);
  customModal.appendChild(eachProductRating);
  const productBottom = document.createElement("div");
  productBottom.className = "modal-btm-container";
  const productQuantityContainer = document.createElement("div");
  productQuantityContainer.className = "quantity-container flex justify-between font-normal text-gray-700 border border-solid border-gray-300 rounded";
  const productQuantityTitle = document.createElement("span");
  productQuantityTitle.style.alignSelf = "center";
  productQuantityTitle.style.color = "white";
  productQuantityTitle.innerText = "Quantity: ";
  productQuantityContainer.appendChild(productQuantityTitle);
  productQuantityContainer.appendChild(productQuantitySelect);
  productBottom.appendChild(productQuantityContainer);
  productBottom.appendChild(productAddToCartBtn);
  modalBottom.appendChild(eachProductCategory);
  modalBottom.appendChild(productBottom);
  customModal.appendChild(modalBottom);
  customModal.style.display = "block";
  overlay.style.display = "block";
}

function openLogin() {
  if (localStorage.getItem("user") == null) {
    window.open("login.html", "_self");
  } else {
    window.open("console.html", "_self");
  }
};