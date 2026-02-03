document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("available-count").innerText =
    localStorage.getItem("parking_available") || 0;

  document.getElementById("reserved-count").innerText =
    localStorage.getItem("parking_reserved") || 0;

  document.getElementById("occupied-count").innerText =
    localStorage.getItem("parking_occupied") || 0;

});console.log("index.js loaded");

function loadDashboardCounts() {

  const data = JSON.parse(localStorage.getItem("dashboardCounts"));

  if (!data) {
    console.log("No dashboardCounts found");
    return;
  }

  console.log("Dashboard data:", data);

  document.getElementById("available-count").innerText = data.available;
  document.getElementById("reserved-count").innerText = data.reserved;
  document.getElementById("occupied-count").innerText = data.occupied;
}

// Run when page loads
window.onload = loadDashboardCounts;
function loadDashboardCounts() {

  const data = JSON.parse(localStorage.getItem("dashboardCounts"));

  if (!data) return;

  document.getElementById("available-count").innerText = data.available;
  document.getElementById("reserved-count").innerText = data.reserved;
  document.getElementById("occupied-count").innerText = data.occupied;
}

loadDashboardCounts();