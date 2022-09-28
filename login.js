const loginPage = document.getElementById("userInfo");
const loginContainer = document.getElementById("loginBtn");
const invalidSpan = document.getElementById("onInvalid");
const invalidMsgElement = document.createElement('span');
const loginBtn = document.createElement("div");
loginBtn.innerText = "Login";
loginBtn.onclick = () => loginUsr();
loginBtn.className = "text-center my-5 w-full px-6 py-2.5 bg-black text-sky-600 font-light text-xs leading-tight rounded shadow-md hover:bg-teal-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-250 ease-in-out";
loginContainer.appendChild(loginBtn);

function loadSite() {
  const loginData = [
    {
      id: 005,
      mode:"client",
      username:"client",
      password:"client",
      email: "client@example.com",
      firstname: "hello",
      lastname: "Smith",
      age: 19,
      gender: "Man",
      image: "https://robohash.org/client",
      cartItems: []
    },
    {
      id: 006,
      mode:"customer",
      username:"customer",
      password:"customer",
      email: "customer@example.com",
      firstname: "Kenny",
      lastname: "Smith",
      age: 19,
      gender: "Man",
      image: "https://robohash.org/customer",
      cartItems: []
    },
    {
      id: 007,
      mode:"admin",
      username:"steveM",
      password:"admin",
      email: "steven.metry@gmail.com",
      firstname: "steven",
      lastname: "metry",
      age: 19,
      gender: "Man",
      image: "https://robohash.org/admin",
      cartItems: []
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
      image: "https://robohash.org/techlife",
      cartItems: []
    }
  ];
  localStorage.setItem("login", JSON.stringify(loginData));
  loginData.forEach((item, index) => {
    if (localStorage.getItem(item.id.toString()) == null) {
      localStorage.setItem(item.id.toString(), JSON.stringify(item));
    } else {
      let newUserInfo = localStorage.getItem(item.id.toString());
      newUserInfo = JSON.parse(newUserInfo);
      loginData[index].username = newUserInfo.username;
      loginData[index].password = newUserInfo.password;
    }
  })
  localStorage.setItem("updatdLogin", JSON.stringify(loginData));
  if (localStorage.getItem("user") != null) {
    window.open("console.html", "_self");
  }
}

function msgDelay(){
  invalidMsgElement.className="text-center w-full text-red-600 my-5";
}

function onInvalidInput(oldLogin) {
  invalidMsgElement.style = "";
  invalidMsgElement.innerText = `${oldLogin != null ? "we dont judge people for their mistakes, BUT our system does :( please enter the new password" : "Wrong :("}`;
  invalidMsgElement.className="animate-ping text-center w-full text-red-600 my-5";
  invalidSpan.innerText = "";
  invalidSpan.appendChild(invalidMsgElement);
  setTimeout(msgDelay, 600);  
  loginPage.style.display = "none";
}

function loginUsr(resultProducts, productQuantitySelect) {
  let userName = document.getElementById("userNameInput");
  let userPassword = document.getElementById("passwordInput");
  const loginUser = JSON.parse(localStorage.getItem("login"));
  const oldLogin = loginUser.find(item => item.username === userName.value && item.password === userPassword.value);
  const updatdLogin = JSON.parse(localStorage.getItem("updatdLogin"));
  const currntLogin = updatdLogin.find(item => item.username === userName.value && item.password === userPassword.value);
  if(currntLogin){
    invalidMsgElement.style.display = "none";
    localStorage.setItem("user", JSON.stringify(currntLogin));
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const redirectVal = params.redirect;
    window.open(`${redirectVal != null ? redirectVal : "console"}.html`, "_self");
  } else if (oldLogin) {
    onInvalidInput(oldLogin);
  } else {
    onInvalidInput();
  }
  // if (oldLogin) {
  //   invalidMsgElement.style.display = "none";
  //   localStorage.setItem("user", JSON.stringify(oldLogin));
  //   const params = new Proxy(new URLSearchParams(window.location.search), {
  //     get: (searchParams, prop) => searchParams.get(prop),
  //   });
  //   const redirectVal = params.redirect;
  //   window.open(`${redirectVal != null ? redirectVal : "console"}.html`, "_self");
  // } else {
  //   onInvalidInput();
  // };
}

function openIndex() {
  window.open("index.html", "_self");
}

// let userObj = {
//   id: 0,
//   mode:"",
//   username:"",
//   password:"",
//   email: "",
//   firstname: "",
//   lastname: "",
//   age: 19,
//   gender: "",
//   image: ""
// }