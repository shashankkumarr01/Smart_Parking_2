// =====================
// SHOW / HIDE STAFF ID
// =====================
function toggleStaffId() {
  const role = document.getElementById("role").value;
  const staffInput = document.getElementById("userid");

  if (role === "staff") {
    staffInput.style.display = "block";
  } else {
    staffInput.style.display = "none";
    staffInput.value = "";
  }
}

// Run when page loads
window.onload = function () {
  toggleStaffId();
};

// =====================
// SIGNUP FUNCTION
// =====================
function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();


  const role = document.getElementById("role").value;   // student / staff
  const userId = document.getElementById("userid").value.trim();
  const errorMsg =document.getElementById("error-msg");
   errorMsg.innerText="";
  // Validation
  if (!email || !password ||!confirmpassword) {
    errorMsg.innerText="Please fill email and password!";
    return;
  }
if (password !== confirmPassword) {
  errorMsg.innerText="Passwords do not match!";
  return;
}
  if (role === "staff" && userId === "") {
    errorMsg.innerText="Please enter Staff ID!";
    return;
  }
  if(role==="staff"&& userId===""){
    errorMsg.InnerText="Please enter Staff ID!"
  }

  // Messages
  if (role === "staff" ) {
    alert("Staff verified. Signup successful!");
  } else {
    alert("Student signup successful!");
  }

  // Save in localStorage
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  localStorage.setItem("role", role);
  localStorage.setItem("userid", userId);

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ role: role, id: userId })
  );

  // Redirect
  window.location.href = "index.html";
}