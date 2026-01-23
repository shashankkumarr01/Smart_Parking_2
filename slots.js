// USER ROLE (Staff or Student)
const user = JSON.parse(localStorage.getItem("loggedInUser")) || {
  role: "Staff"
};

const reserveBtn = document.getElementById("reserve-btn");
if (user.role === "Staff") reserveBtn.style.display = "block";

const parkingLot = document.getElementById("parking-lot");
let selectedSlot = null;

// EXACTLY 5 SLOTS
const n = 5;
let slots = {};

// CREATE SLOTS (ALL AVAILABLE INITIALLY)
for (let i = 1; i <= n; i++) {
  const slotId = "slot-" + i;

  slots[slotId] = { status: "available" };

  const div = document.createElement("div");
  div.id = slotId;
  div.innerText = i;
  div.className = "slot available";

  div.addEventListener("click", () => {
    if (slots[slotId].status !== "available") return;

    if (selectedSlot) selectedSlot.classList.remove("selected");
    selectedSlot = div;
    div.classList.add("selected");
  });

  parkingLot.appendChild(div);
}
// SENSOR UPDATE FUNCTION (to be triggered by Firebase later)
function setSlotOccupied(slotNumber) {
  const slotId = "slot-" + slotNumber;

  // Safety check
  if (!slots[slotId]) return;

  slots[slotId].status = "occupied";

  const slotDiv = document.getElementById(slotId);
  slotDiv.className = "slot occupied";

  updateCounters();
}

// UPDATE COUNTERS
function updateCounters() {
  let available = 0, reserved = 0, occupied = 0;

  for (let key in slots) {
    if (slots[key].status === "available") available++;
    else if (slots[key].status === "reserved") reserved++;
    else if (slots[key].status === "occupied") occupied++;
  }

  document.getElementById("total-slots").innerText = n;
  document.getElementById("available-slots").innerText = available;
  document.getElementById("reserved-slots").innerText = reserved;
  document.getElementById("occupied-slots").innerText = occupied;
}

updateCounters();

// STAFF RESERVATION ONLY
reserveBtn.addEventListener("click", () => {
  if (!selectedSlot) {
    alert("Select an available slot first!");
    return;
  }

  const slotId = selectedSlot.id;

  slots[slotId].status = "reserved";
  selectedSlot.className = "slot reserved";
  selectedSlot.classList.remove("selected");
  selectedSlot = null;

  updateCounters();

  // AUTO RELEASE AFTER 10 MINUTES
  setTimeout(() => {
    slots[slotId].status = "available";
    document.getElementById(slotId).className = "slot available";
    updateCounters();
  }, 600000);
});
