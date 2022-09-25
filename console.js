const navUsrSpan = document.getElementById("navUsrnameSpan");
const consoleContainer = document.getElementById("consoleContainer");
const profileContainer = document.getElementById("profileContainer");
const inputContainer = document.getElementById("inputContainer");
const navUsrnameDiv = document.getElementById("navUsrnameDiv");
let userInfo = localStorage.getItem("user");

navUsrnameDiv.appendChild(navUsrSpan);
const body = document.getElementById("body");
const editSpan = document.getElementById("editBtn");
const profileImg = document.getElementById("profileImg");
function consoleLoad() {
  userInfo = JSON.parse(userInfo);
  if(localStorage.getItem(JSON.stringify(userInfo.id)) == null){
    localStorage.setItem(JSON.stringify(userInfo.id), JSON.stringify(userInfo));
  } else {
    let usersInfo = localStorage.getItem(`${userInfo.id}`);
    userInfo = JSON.parse(usersInfo);
  }
  ["username","password","email","firstname","lastname"].forEach(item => {
    createInput(item, userInfo[item]);
  });
  profileImg.src = userInfo.image;
  navUsrSpan.innerText = `${userInfo.firstname} ${userInfo.lastname}`;
}

function disableInput() {
  let keys = ["username","password","email","firstname","lastname"];
  keys.forEach(item => {
    let inputBox = document.getElementById(item);
    inputBox.disabled = true;
  })
}

function onSave() {
  disableInput()
  let usrInputLst = document.getElementsByName("profleInput");
  usrInputLst.forEach(item => {
    let eachUsrInfo = userInfo[item.id];
    if (item.value != eachUsrInfo.value) {
      eachUsrInfo.value = item.value;
      userInfo[item.id] = item.value;
    }
  })
  localStorage.setItem(JSON.stringify(userInfo.id), JSON.stringify(userInfo));
  console.log(JSON.parse(localStorage.getItem(JSON.stringify(userInfo.id))));
}

function createInput(key, value) {
  let profileInput = document.createElement("input");
  profileInput.disabled = true;
  profileInput.id = key;
  profileInput.value = value;
  profileInput.name = "profleInput"
  profileInput.className = "rounded-lg w-full ml-2 border border-slate-200 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40";
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

