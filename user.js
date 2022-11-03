function isInfoSet(infoKey, infoType, infoInput) {
  let isValid = false;
  const allUsers = JSON.parse(localStorage.getItem("login"));
  switch (infoType) {
    case 'number':
      isValid = infoInput.trim() !== "" && !isNaN(infoInput.trim());
      if (isValid) {
        return true;
      }
      return false;
    case 'password':
      return true;  // need to implement later on
    default:
      isValid = infoInput.trim() !== "";
      if (isValid) {
        if (infoKey === "username") {
          return !allUsers.find(curUser => curUser.username === infoInput.trim());
        } else if (infoKey === "email") {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(infoInput.trim()) && !allUsers.find(curUser => curUser.email === infoInput.trim());
        } else if (infoKey === "firstName" || infoKey === "lastName") {
          if (infoInput.trim() !== "") {
           return /^[a-zA-Z ]{3,}$/.test(infoInput.trim());
          } 
        } else {
          return true;
        }
      }
      return false;
  }
}

function validateNewUser() {
  const formInputs = document.getElementById("newUser").elements;
  const isUsernameValid = isInfoSet('username', formInputs['username'].type, formInputs['username'].value);
  document.getElementById("usernameError").style.display = isUsernameValid ? 'none' : 'block';
  // const isPasswordValid = isInfoSet('password', formInputs['password'].type, formInputs['password'].value);
  // document.getElementById("passwordError").style.display = isPasswordValid ? 'none' : 'block';
  const isEmailValid = isInfoSet('email', formInputs['email'].type, formInputs['email'].value);
  document.getElementById("emailError").style.display = isEmailValid ? 'none' : 'block';
  const isPhoneValid = isInfoSet('phone', formInputs['phone'].type, formInputs['phone'].value);
  document.getElementById("phoneError").style.display = isPhoneValid ? 'none' : 'block';
  const isFirstNameValid = isInfoSet('firstName', formInputs['firstName'].type, formInputs['firstName'].value);
  document.getElementById("firstNameError").style.display = isFirstNameValid ? 'none' : 'block';
  const isLastNameValid = isInfoSet('lastName', formInputs['lastName'].type, formInputs['lastName'].value);
  document.getElementById("lastNameError").style.display = isLastNameValid ? 'none' : 'block';
  const isAgeValid = isInfoSet('age', formInputs['age'].type, formInputs['age'].value);
  document.getElementById("ageError").style.display = isAgeValid ? 'none' : 'block';
  let allValid = isUsernameValid && isEmailValid && isFirstNameValid && isLastNameValid && isAgeValid;
  if (allValid) {
    let allUsers = JSON.parse(localStorage.getItem("login"));
    allUsers.sort((a, b) => a.id - b.id);
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const newUserData = {
      id: allUsers[allUsers.length - 1].id + 1,
      mode: "customer",
      username: formInputs['username'].value,
      password: formInputs['password'].value,
      email: formInputs['email'].value,
      firstname: formInputs['firstName'].value,
      lastname: formInputs['lastName'].value,
      age: parseInt(formInputs['age'].value),
      gender: formInputs['gender'].value,
      image: `https://robohash.org/${formInputs['username'].value}`,
      cartItems: cartItems,
      address: {
        line1: "",
        line2: "",
        suburb: "",
        city: "",
        postCode: "",
        message:""
      },
      receipts: []
    };
    allUsers.push(newUserData);
    localStorage.setItem("login", JSON.stringify(allUsers));
    localStorage.setItem("user", JSON.stringify(newUserData));
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const redirectVal = params.redirect;
    window.open(`${redirectVal != null ? redirectVal : "console"}.html`, "_self");
  }
}
