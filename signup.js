import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const db = getDatabase();

function signup() {
  const role = document.getElementById("role").value; // staff or student
  const userId = document.getElementById("userid").value;

  if (role === "staff") {
    const staffRef = ref(db, "staff_ids/" + userId);

    get(staffRef).then((snapshot) => {
      if (snapshot.exists()) {
        // ✅ Valid staff
        alert("Staff verified. Signup successful!");
        // continue signup process
      } else {
        // ❌ Invalid staff
        alert("Invalid Staff ID. Access denied.");
      }
    });
  } else {
    // student signup (no verification needed)
    alert("Student signup successful!");
  }
}

  