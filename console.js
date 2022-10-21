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
const inputKeys = ["username","password","email","firstname","lastname", "age"];

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