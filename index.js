console.log("index.js loaded");

document.addEventListener("DOMContentLoaded", () => {

  const data = JSON.parse(localStorage.getItem("dashboardCounts"));
  console.log("Read dashboardCounts:", data);

  if (!data) {
    console.log("No dashboardCounts found");
    return;
  }

  document.getElementById("Total-count").innerText = data.total;
  document.getElementById("available-count").innerText = data.available;
  document.getElementById("reserved-count").innerText = data.reserved;
  document.getElementById("occupied-count").innerText = data.occupied;

});