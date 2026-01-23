document.getElementById("loginBtn").onclick = () => {
  let u = document.getElementById("username").value.trim();
  let p = document.getElementById("password").value.trim();
  let err = document.getElementById("errMsg");

  // Simple local login: must match signup stored values
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let found = users.find(x => x.username === u && x.password === p);
  if (found) {
    location.href = "slots.html";
  } else {
    err.innerText = "❌ Invalid credentials!";
  }
};
