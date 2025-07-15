const params = new URLSearchParams(window.location.search);
let index = params.get("index");
let data = JSON.parse(localStorage.getItem("memberships") || "[]");

// If no index in query, fallback to index 0 (for manual testing)
if (index === null || !data[index]) {
  if (data.length === 0) {
    alert("No membership data found.");
    window.location.href = "view-plan.html";
  } else {
    index = 0; // fallback to first entry for preview
  }
}

// Now continue using index as normal
const entry = data[index];
document.getElementById("membershipType").value = entry.type;
document.getElementById("membershipAmount").value = entry.amount;
document.getElementById("membershipOffer").value = entry.offer;

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const updated = {
    type: document.getElementById("membershipType").value,
    amount: document.getElementById("membershipAmount").value,
    offer: document.getElementById("membershipOffer").value,
  };

  data[index] = updated;
  localStorage.setItem("memberships", JSON.stringify(data));
  alert("Updated successfully.");
  window.location.href = "view-plan.html";
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}