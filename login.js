// Mock users database
let users = JSON.parse(localStorage.getItem("mockUsers") || "[]");

const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.email === email && u.password === password);

  if(user){
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "slots.html";
  } else {
    errorMsg.innerText = "Invalid email or password!";
  }
});
