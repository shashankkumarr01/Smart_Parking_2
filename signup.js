function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value; // "Staff" or "Student"
  const userId = document.getElementById("userid").value.trim();

  if (!email || !password || !userId) {
    alert("Please fill all fields!");
    return;
  }

  if (role === "Staff") {
    alert("Staff verified. Signup successful!");
  } else {
    alert("Student signup successful!");
  }

  // ============================
  // SAVE DATA IN LOCALSTORAGE
  // ============================
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  localStorage.setItem("role", role); // <-- SAVE ROLE
  localStorage.setItem("userid", userId);

  // Optional: save loggedInUser so slots page can read immediately
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ role: role, id: userId })
  );

  // Redirect to login page
  window.location.href = "index.html";
}
