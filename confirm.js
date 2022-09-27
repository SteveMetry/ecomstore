function preload() {
  if (localStorage.getItem("user") == null) {
    window.open("login.html?redirect=confirm", "_self");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  user.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  localStorage.setItem(user.id.toString(), JSON.stringify(user));
  console.log(JSON.parse(localStorage.getItem(user.id.toString())));
}