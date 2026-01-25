document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRole = localStorage.getItem("role"); // Assuming you saved role on signup

    if (email === savedEmail && password === savedPassword) {

      // ✅ Save logged-in user info for slots page
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: savedRole || "Student", id: email })
      );

      alert("Login successful!");
      window.location.href = "slots.html";

    } else {
      document.getElementById("error-msg").innerText = "Invalid email or password";
    }
  });

});
