let users = JSON.parse(localStorage.getItem("mockUsers") || "[]");

const signupForm = document.getElementById("signup-form");
const errorMsg = document.getElementById("error-msg");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if(users.find(u => u.email === email)){
    errorMsg.innerText = "Email already exists!";
    return;
  }

  const uid = Date.now();
  users.push({ uid, name, email, password, role });
  localStorage.setItem("mockUsers", JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "login.html";
});
