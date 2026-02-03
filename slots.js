const RESERVATION_TIME = 10 * 60; // seconds (10 minutes)
// -----------------------------
// USER ROLE
// -----------------------------
let userRole = localStorage.getItem("role") || "student";

// -----------------------------
// SLOT CONFIG
// -----------------------------
const totalSlots = 5;

const parkingLot = document.getElementById("parkingLot");
console.log(parkingLot); // should NOT be null
let selectedSlot = null;

// -----------------------------
// CREATE SLOTS
// -----------------------------
for (let i = 1; i <= totalSlots; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.status = "available";
  slot.innerText = i;
  slot.dataset.slotNumber = i;


  slot.addEventListener("click", () => {
    if (slot.dataset.status === "reserved") return;

    if (selectedSlot) selectedSlot.classList.remove("selected");

    if (selectedSlot === slot) {
      selectedSlot = null;
    } else {
      selectedSlot = slot;
      slot.classList.add("selected");
    }
  });

  parkingLot.appendChild(slot);
}

// -----------------------------
// UPDATE COUNTS
// -----------------------------
function updateCounts() {
  const slots = document.querySelectorAll(".slot");
  let available = 0;
  let reserved = 0;

  slots.forEach(slot => {
    if (slot.dataset.status === "reserved") reserved++;
    else available++;
  });

  document.getElementById("total-slots").innerText = slots.length;
  document.getElementById("available-slots").innerText = available;
  document.getElementById("reserved-slots").innerText = reserved;
  document.getElementById("occupied-slots").innerText = 0;
}



updateCounts();

// -----------------------------
// RESERVE SLOT (STAFF ONLY)
// -----------------------------
function reserveSelectedSlot() {

  if (userRole !== "staff") {
    alert("Only staff can reserve slots");
    return;
  }

  if (!selectedSlot) {
    alert("Please select a slot first");
    return;
  }

  const loading = document.getElementById("loading");
  const btn = document.querySelector(".reserve-main-btn");

  loading.classList.remove("hidden");
  btn.disabled = true;

  setTimeout(() => {
  let timeLeft = RESERVATION_TIME;

  selectedSlot.dataset.status = "reserved";
  selectedSlot.classList.remove("selected");
  selectedSlot.classList.add("reserved");

  const slot = selectedSlot;
  selectedSlot = null;
  updateCounts();

  const countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    slot.innerHTML = `
  <div class="reserved-label">RESERVED</div>
  <div class="timer-text">
    ${minutes}:${seconds.toString().padStart(2, "0")}
  </div>
`;


    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown);
      slot.dataset.status = "available";
      slot.classList.remove("reserved");
      slot.innerText = slot.dataset.slotNumber;

      updateCounts();
    }
  }, 1000);

  loading.classList.add("hidden");
  btn.disabled = false;
}, 500);
}


// -----------------------------
// HIDE BUTTON FOR STUDENTS
// -----------------------------
if (userRole !== "staff") {
  const btn = document.querySelector(".reserve-main-btn");
  if (btn) btn.style.display = "none";
}

// -----------------------------
// LOGOUT
// -----------------------------
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}