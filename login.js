document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  // demo credentials
  if (email === "admin@gmail.com" && password === "1234") {
    errorMsg.innerText = "";
    alert("Login successful");
    // window.location.href = "dashboard.html";
  } else {
    errorMsg.innerText = "Invalid email or password";
  }
});