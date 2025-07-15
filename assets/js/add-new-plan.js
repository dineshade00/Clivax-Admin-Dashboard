const plans = {
  basic: { amount: "999", offer: "Free diet plan" },
  standard: { amount: "2499", offer: "1 week free training" },
  premium: { amount: "4499", offer: "Free gym kit" },
  personal: { amount: "2499", offer: "Dedicated trainer & diet plan" },
};

// Update amount and offer when membership type changes
function updateDetails() {
  const type = document.getElementById("membershipType").value;
  document.getElementById("membershipAmount").value = plans[type]?.amount || "";
  document.getElementById("membershipOffer").value = plans[type]?.offer || "";
}

// Handle form submission
document.getElementById("membershipForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const type = document.getElementById("membershipType").value;
  const amount = document.getElementById("membershipAmount").value;
  const offer = document.getElementById("membershipOffer").value;

  const data = JSON.parse(localStorage.getItem("memberships") || "[]");
  data.push({ type, amount, offer });
  localStorage.setItem("memberships", JSON.stringify(data));

  alert("Membership added!");
  this.reset();
});

// Chart Setup
const ctx = document.getElementById("membershipChart").getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, 250);
gradient.addColorStop(0, "rgba(13, 110, 253, 0.3)");
gradient.addColorStop(1, "rgba(13, 110, 253, 0)");

const membershipChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Basic", "Standard", "Premium", "Personal Training"],
    datasets: [
      {
        label: "Price (INR)",
        data: [999, 2499, 4499, 2499],
        backgroundColor: gradient,
        borderColor: "#25D366",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#25D366",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Gym Membership Prices",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
        },
        grid: {
          color: "#eaeaea",
        },
      },
      x: {
        grid: { display: false },
      },
    },
  },
});
