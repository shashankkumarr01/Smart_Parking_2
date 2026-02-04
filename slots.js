console.log("slots.js loaded");
const storage = sessionStorage;


// -----------------------------
// CURRENT USER
// -----------------------------
const currentUser = JSON.parse(localStorage.getItem("user"));

if (!currentUser) {
  alert("Please login first");
  window.location.href = "login.html";
}

// -----------------------------
// ROLE CHECK
// -----------------------------
const reserveBtn = document.querySelector(".reserve-main-btn");
const loading = document.getElementById("loading");

if (currentUser.role !== "staff" && reserveBtn) {
  reserveBtn.style.display = "none";
}

// -----------------------------
// CONFIG
// -----------------------------
const totalSlots = 5;
const RESERVATION_TIME = 10 * 60;

// one-user-one-slot key
const userKey = "reservedSlot_" + currentUser.email;

// -----------------------------
// ELEMENTS
// -----------------------------
const parkingLot = document.getElementById("parkingLot");
let selectedSlot = null;

// -----------------------------
// CREATE SLOTS
// -----------------------------
for (let i = 1; i <= totalSlots; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.status = "available";
  slot.dataset.slotNumber = i;
  slot.innerText = i;

  slot.onclick = () => {
    if (slot.dataset.status === "reserved") return;

    document.querySelectorAll(".slot").forEach(s => s.classList.remove("selected"));
    selectedSlot = slot;
    slot.classList.add("selected");
  };

  parkingLot.appendChild(slot);
}

// -----------------------------
// UPDATE COUNTS
// -----------------------------
function updateCounts() {
  const slots = document.querySelectorAll(".slot");
  let reserved = 0;

  slots.forEach(s => {
    if (s.dataset.status === "reserved") reserved++;
  });

  const total = slots.length;
  const available = total - reserved;

  document.getElementById("total-slots").innerText = total;
  document.getElementById("reserved-slots").innerText = reserved;
  document.getElementById("available-slots").innerText = available;
  document.getElementById("occupied-slots").innerText = 0;

  localStorage.setItem(
    "dashboardCounts",
    JSON.stringify({ total, reserved, available, occupied: 0 })
  );
}

updateCounts();

// -----------------------------
// RESERVE SLOT
// -----------------------------
function reserveSelectedSlot() {

  // Only staff can reserve
  if (currentUser.role !== "staff") {
    alert("Only staff can reserve slots");
    return;
  }

  // Check if user already reserved a slot this session
  if (sessionStorage.getItem(userKey)) {
    alert("You already reserved one slot this session");
    return;
  }

  // Check if a slot is selected
  if (!selectedSlot) {
    alert("Select a slot first");
    return;
  }

  // SHOW LOADING
  loading.classList.remove("hidden");
  reserveBtn.disabled = true;

  setTimeout(() => {
    let timeLeft = RESERVATION_TIME;
    const slot = selectedSlot;
    selectedSlot = null;

    // Save user reservation in sessionStorage
    sessionStorage.setItem(userKey, slot.dataset.slotNumber);

    // Mark slot as reserved
    slot.dataset.status = "reserved";
    slot.classList.add("reserved");
    slot.classList.remove("selected");

    updateCounts();

    loading.classList.add("hidden");
    reserveBtn.disabled = false;

    // Start countdown timer
    const timer = setInterval(() => {
      const min = Math.floor(timeLeft / 60);
      const sec = timeLeft % 60;

      slot.innerHTML = `
        <div class="reserved-label">RESERVED</div>
        <div class="timer-text">${min}:${sec.toString().padStart(2, "0")}</div>
      `;

      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timer);

        // Free user and slot after timer ends
        sessionStorage.removeItem(userKey);

        slot.dataset.status = "available";
        slot.classList.remove("reserved");
        slot.innerText = slot.dataset.slotNumber;

        updateCounts();
      }
    }, 1000);

  }, 1200); // simulate backend delay
}


// -----------------------------
// LOGOUT
// -----------------------------
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
