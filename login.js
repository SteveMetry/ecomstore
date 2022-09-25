const loginPage = document.getElementById("userInfo")
const loginContainer = document.getElementById("loginBtn");
const invalidSpan = document.getElementById("onInvalid");
const invalidMsgElement = document.createElement('p');
const loginBtn = document.createElement("div");
loginBtn.innerText = "Login";
loginBtn.onclick = () => loginUsr();
loginBtn.className = "text-center my-5 w-full px-6 py-2.5 bg-black text-sky-600 font-light text-xs leading-tight rounded shadow-md hover:bg-teal-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-250 ease-in-out";
loginContainer.appendChild(loginBtn);

function loadSite() {
  if (localStorage.getItem("user") == null) {
    localStorage.setItem("user", "{}");
  }
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
        image: "https://robohash.org/client"
        
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
        image: "https://robohash.org/customer"
        
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
      image: "https://robohash.org/admin"
      
    }
  ];
    localStorage.setItem("login", JSON.stringify(loginData));
}

function msgDelay(){
  invalidMsgElement.className="text-center w-full text-red-600 my-5";
}

function onInvalidInput() {
  invalidMsgElement.style = "";
  invalidMsgElement.innerText = "Invalid Entry";
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
  const Currentlogin = loginUser.find(item => item.username === userName.value && item.password === userPassword.value);
  if(Currentlogin){
    invalidMsgElement.style.display = "none";
    localStorage.setItem("user", JSON.stringify(Currentlogin));
    window.open("console.html", "_self");
  } else {
    onInvalidInput();
  };
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