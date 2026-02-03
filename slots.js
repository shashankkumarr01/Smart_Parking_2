console.log("slots.js loaded");
console.log("slots.js running");
// -----------------------------
// CURRENT USER
// -----------------------------
const currentUser = JSON.parse(localStorage.getItem("user"));
let userHasReserved = false;   // track current user's reservation
const reserveBtn = document.getElementById("reserveBtn");

if (!currentUser || currentUser.role !== "staff") {
  reserveBtn.style.display = "none";
}
// -----------------------------
// CONFIG
// -----------------------------
const totalSlots = 5;
const RESERVATION_TIME = 10 * 60;

// -----------------------------
// ELEMENTS
// -----------------------------
const parkingLot = document.getElementById("parkingLot");

if (!parkingLot) {
  console.error("❌ parkingLot not found");
  throw new Error("parkingLot missing");
}

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

updateCounts();

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
  const occupied = 0;

  // Update slots.html numbers
  document.getElementById("total-slots").innerText = total;
  document.getElementById("reserved-slots").innerText = reserved;
  document.getElementById("available-slots").innerText = available;
  document.getElementById("occupied-slots").innerText = occupied;

  // ✅ SAVE FOR INDEX PAGE
  localStorage.setItem("dashboardCounts", JSON.stringify({
    
    reserved:reserved,
    available:available,
    occupied:occupied
  }));
}
console.log("Counts saved:",reserved,occupied);

// -----------------------------
// RESERVE SLOT
// -----------------------------
function reserveSelectedSlot() {

  if (!currentUser || currentUser.role !== "staff") {
    alert("Only staff can reserve slots");
    return;
  }

  if (userHasReserved) {
    alert("You already reserved one slot");
    return;
  }

  if (!selectedSlot) {
    alert("Select a slot first");
    return;
  }

  // ✅ SHOW LOADING
  document.getElementById("loading").classList.remove("hidden");

  // ⏳ Simulate backend delay
  setTimeout(() => {

    document.getElementById("loading").classList.add("hidden");

    let timeLeft = RESERVATION_TIME;
    const slot = selectedSlot;
    selectedSlot = null;

    slot.dataset.status = "reserved";
    slot.classList.add("reserved");
    slot.classList.remove("selected");

    userHasReserved = true;

    updateCounts();

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

        slot.dataset.status = "available";
        slot.classList.remove("reserved");
        slot.innerText = slot.dataset.slotNumber;

        userHasReserved = false;
        updateCounts();
      }

    }, 1000);

  }, 1500); // 1.5 sec fake backend delay
}


// -----------------------------
// LOGOUT
// -----------------------------
function logout() {
  window.location.href = "index.html";
}