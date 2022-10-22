const loginContainer = document.getElementById("loginBtn");
const invalidSpan = document.getElementById("onInvalid");
const invalidMsgElement = document.createElement('span');
const loginBtn = document.createElement("button");
loginBtn.innerText = "Login";
loginBtn.onclick = () => loginUsr();
loginBtn.className = "mb-4 px-6 py-2.5 leading-tight uppercase w-full shadow-md login-btns";
loginContainer.appendChild(loginBtn);

function loadSite() {
  if (localStorage.getItem("login") == null) {
    const loginData = [
      {
        id: 005,
        mode:"client",
        username:"client",
        password:"client",
        phone: 094256789,
        email: "client@example.com",
        firstname: "hello",
        lastname: "Smith",
        age: 19,
        gender: "Man",
        image: "https://robohash.org/client",
        cartItems: [],
        address: {
          line1: "",
          line2: "",
          suburb: "",
          city: "",
          postCode: "",
          message:""
        }
      }, 
      {
        id: 006,
        mode:"customer",
        username:"customer",
        password:"customer",
        phone: 094786183,
        email: "customer@example.com",
        firstname: "Kenny",
        lastname: "Smith",
        age: 19,
        gender: "Man",
        image: "https://robohash.org/customer",
        cartItems: [],
        address: {
          line1: "",
          line2: "",
          suburb: "",
          city: "",
          postCode: "",
          message:""
        }
      },
      {
        id: 007,
        mode:"admin",
        username:"steveM",
        password:"admin",
        phone: 094721489,
        email: "steven.metry@gmail.com",
        firstname: "steven",
        lastname: "metry",
        age: 19,
        gender: "Man",
        image: "https://robohash.org/bbirch",
        cartItems: [],
        address: {
          line1: "",
          line2: "",
          suburb: "",
          city: "",
          postCode: "",
          message:""
        }
      },
      {
        id: 010,
        mode:"admin",
        username:"e",
        password:"e",
        email: "Admin@tech.com",
        firstname: "e",
        lastname: "yusif",
        age: 18,
        gender: "Man",
        image: "https://robohash.org/bbirch",
        cartItems: [],
        address: {
          line1: "",
          line2: "",
          suburb: "",
          city: "",
          postCode: "",
          message:""
        }
      }
    ];
    localStorage.setItem("login", JSON.stringify(loginData));
  }
  if (localStorage.getItem("user") != null) {
    window.open("console.html", "_self");
  }
}

function msgDelay(){
  invalidMsgElement.className="text-center w-full text-red-600 my-5";
}

function onInvalidInput() {
  invalidMsgElement.style = "";
  invalidMsgElement.innerText = "invalid";
  invalidMsgElement.className="animate-ping text-center w-full text-red-600 my-5";
  invalidSpan.innerText = "";
  invalidSpan.appendChild(invalidMsgElement);
  setTimeout(msgDelay, 600);  
}

function getParam() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params.redirect;
}

function loginUsr(resultProducts, productQuantitySelect) {
  let userName = document.getElementById("userNameInput");
  let userPassword = document.getElementById("passwordInput");
  const loginUsers = JSON.parse(localStorage.getItem("login"));
  const curUser = loginUsers.find(item => item.username === userName.value && item.password === userPassword.value);
  if (curUser) {
    invalidMsgElement.style.display = "none";
    localStorage.setItem("user", JSON.stringify(curUser));
    const redirectVal = getParam();
    window.open(`${redirectVal != null ? redirectVal : "console"}.html`, "_self");
  } else {
    onInvalidInput();
  }
}

function openIndex() {
  window.open("index.html", "_self");
}

function openCreateUser() {
  window.open("new_user.html", "_self");
}

function openNewUser() {
  const redirectVal = getParam();
  window.open(`new_user.html${redirectVal != null ? "?redirect=pay" : ""}`, "_self");
}