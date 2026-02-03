document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRole = localStorage.getItem("role");

    if (email === savedEmail && password === savedPassword) {

      // ✅ STORE USER FOR SLOT PAGE
      localStorage.setItem("user", JSON.stringify({
        email: email,
        role: savedRole || "student"
      }));

      alert("Login successful!");
      window.location.href = "slots.html";
      

    } else {
      document.getElementById("error-msg").innerText =
        "Invalid email or password";
    }
  });

});