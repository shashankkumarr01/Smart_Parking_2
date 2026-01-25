document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // USER (SIMULATED LOGIN)
  // =======================
  /*
    Change role to "Student" to test student view
  */
  if (!localStorage.getItem("loggedInUser")) {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ role: "Staff" })
    );
  }

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // =======================
  // DOM ELEMENTS
  // =======================
  const parkingLot = document.getElementById("parking-lot");
  const reserveBtn = document.getElementById("reserve-btn");

  const totalSlotsEl = document.getElementById("total-slots");
  const availableSlotsEl = document.getElementById("available-slots");
  const reservedSlotsEl = document.getElementById("reserved-slots");
  const occupiedSlotsEl = document.getElementById("occupied-slots");

  // =======================
  // STATE
  // =======================
  const TOTAL_SLOTS = 5;
  let slots = {};
  let selectedSlot = null;

  // =======================
  // HIDE BUTTON FOR STUDENT
  // =======================
  if (!user || user.role !== "Staff") {
    reserveBtn.style.display = "none";
  }

  // =======================
  // CREATE SLOTS
  // =======================
  for (let i = 1; i <= TOTAL_SLOTS; i++) {
    const slotId = "slot-" + i;

    slots[slotId] = { status: "available" };

    const div = document.createElement("div");
    div.id = slotId;
    div.innerText = i;
    div.className = "slot available";

    div.addEventListener("click", () => {
      if (slots[slotId].status !== "available") return;

      if (selectedSlot) {
        selectedSlot.classList.remove("selected");
      }

      selectedSlot = div;
      div.classList.add("selected");
    });

    parkingLot.appendChild(div);
  }

  // =======================
  // STAFF RESERVATION ONLY
  // =======================
  reserveBtn.addEventListener("click", () => {

    if (!user || user.role !== "Staff") {
      alert("Only staff can reserve slots!");
      return;
    }

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
      if (slots[slotId].status === "reserved") {
        slots[slotId].status = "available";
        document.getElementById(slotId).className = "slot available";
        updateCounters();
      }
    }, 600000);
  });

  // =======================
  // SENSOR FUNCTION (FUTURE)
  // =======================
  window.setSlotOccupied = function (slotNumber) {
    const slotId = "slot-" + slotNumber;
    if (!slots[slotId]) return;

    slots[slotId].status = "occupied";
    document.getElementById(slotId).className = "slot occupied";
    updateCounters();
  };

  // =======================
  // UPDATE COUNTERS
  // =======================
  function updateCounters() {
    let available = 0;
    let reserved = 0;
    let occupied = 0;

    for (let key in slots) {
      if (slots[key].status === "available") available++;
      else if (slots[key].status === "reserved") reserved++;
      else if (slots[key].status === "occupied") occupied++;
    }

    totalSlotsEl.innerText = TOTAL_SLOTS;
    availableSlotsEl.innerText = available;
    reservedSlotsEl.innerText = reserved;
    occupiedSlotsEl.innerText = occupied;
  }

  updateCounters();
});
