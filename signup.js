document.getElementById("signupBtn").onclick = () => {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!username || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Retrieve existing users or empty array
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if username already exists
  if (users.find(user => user.username === username)) {
    alert("Username already taken. Choose another.");
    return;
  }

  // Add new user
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Please login.");
  location.href = "login.html"; // redirect to login page
};
