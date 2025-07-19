// Function to get chart colors (already present in your code)
function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var t = document.getElementById(e).getAttribute("data-colors");
    if (t)
      return (t = JSON.parse(t)).map(function (e) {
        var t = e.replace(" ", "");
        if (-1 === t.indexOf(",")) {
          var a = getComputedStyle(document.documentElement).getPropertyValue(
            t
          );
          return a || t;
        }
        var r = e.split(",");
        return 2 != r.length
          ? t
          : "rgba(" +
              getComputedStyle(document.documentElement).getPropertyValue(
                r[0]
              ) +
              "," +
              r[1] +
              ")";
      });
  }
}

// Get chart colors for the "Yearly Active and Inactive" chart
var linechartDatalabelColors = getChartColorsArray("line_chart_datalabel");

// Initialize the chart with some default data
var chart; // Declare chart globally

if (linechartDatalabelColors) {
  var initialCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var initialActiveData = [21, 24, 12, 13, 22, 11, 13, 12, 22, 9, 8, 7];
  var initialInactiveData = [14, 11, 16, 12, 17, 13, 12, 11, 15, 22, 17, 11];

  var options = {
    chart: {
      height: 380,
      type: "line",
      zoom: {
        enabled: !1,
      },
      toolbar: {
        show: !1,
      },
    },
    colors: linechartDatalabelColors,
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      width: [3, 3],
      curve: "straight",
    },
    series: [
      {
        name: "Active",
        data: initialActiveData,
      },
      {
        name: "Inactive",
        data: initialInactiveData,
      },
    ],
    title: {
      text: "Yearly Active and Inactive", // Changed title to be more relevant
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.2,
      },
      borderColor: "#f1f1f1",
    },
    markers: {
      style: "inverted",
      size: 6,
    },
    xaxis: {
      categories: initialCategories,
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Active & Inactive Members",
      }, // More descriptive title
      min: 0, // Set min to 0 for better visualization
      max: 40,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: !0,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: !1,
            },
          },
          legend: {
            show: !1,
          },
        },
      },
    ],
  };

  chart = new ApexCharts(
    document.querySelector("#line_chart_datalabel"),
    options
  );
  chart.render();
}

// --- Function to Generate Dummy Data ---
function generateDummyData(fromDate, toDate) {
  const activeData = [];
  const inactiveData = [];
  const categories = [];

  let currentDate = new Date(fromDate);
  const endDate = new Date(toDate);

  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString("en-us", {
      month: "short",
    });
    const year = currentDate.getFullYear();
    categories.push(`${month} ${year}`);

    // Generate random dummy data for active and inactive members
    // You can adjust the range as needed
    activeData.push(Math.floor(Math.random() * (35 - 10 + 1)) + 10); // Between 10 and 35
    inactiveData.push(Math.floor(Math.random() * (25 - 5 + 1)) + 5); // Between 5 and 25

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return {
    categories,
    activeData,
    inactiveData,
  };
}

// --- Event Listener for Generate Report Button ---
document
  .getElementById("generateReportBtn")
  .addEventListener("click", function () {
    const fromDateInput = document.getElementById("fromDate").value;
    const toDateInput = document.getElementById("toDate").value;

    // Basic validation for MM/YYYY format
    const monthYearRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

    if (
      !monthYearRegex.test(fromDateInput) ||
      !monthYearRegex.test(toDateInput)
    ) {
      alert("Please enter dates in MM/YYYY format (e.g., 01/2023).");
      return;
    }

    // Parse dates (assuming MM/YYYY format)
    const [fromMonth, fromYear] = fromDateInput.split("/").map(Number);
    const [toMonth, toYear] = toDateInput.split("/").map(Number);

    // Construct Date objects for comparison and iteration
    const fromDate = new Date(fromYear, fromMonth - 1, 1); // Month is 0-indexed
    const toDate = new Date(toYear, toMonth - 1, 1);

    if (fromDate > toDate) {
      alert(
        "Start date cannot be after end date. Please check your selection."
      );
      return;
    }

    // Generate dummy data based on the selected range
    const { categories, activeData, inactiveData } = generateDummyData(
      fromDate,
      toDate
    );

    // Update the chart with the new data
    if (chart) {
      chart.updateOptions({
        xaxis: {
          categories: categories,
        },
        series: [
          {
            name: "Active",
            data: activeData,
          },
          {
            name: "Inactive",
            data: inactiveData,
          },
        ],
      });
    } else {
      console.error(
        "Chart not initialized. Make sure #line_chart_datalabel exists."
      );
    }
  });

// ####################

// === MEMBER DATA (from file) ===
const members = [
  { plan: "1 month plan", status: "Active", startDate: "01/2025" },
  { plan: "1 month plan", status: "Active", startDate: "02/2025" },
  { plan: "3 month plan", status: "Inactive", startDate: "03/2025" },
  { plan: "3 month plan", status: "Inactive", startDate: "04/2025" },
  { plan: "6 month plan", status: "Active", startDate: "05/2025" },
  { plan: "1 year plan", status: "Inactive", startDate: "06/2025" },
  { plan: "1 month plan", status: "Active", startDate: "07/2025" },
  { plan: "3 month plan", status: "Inactive", startDate: "01/2025" },
  { plan: "6 month plan", status: "Active", startDate: "02/2025" },
  { plan: "1 year plan", status: "Inactive", startDate: "03/2025" },
  { plan: "3 month plan", status: "Active", startDate: "04/2025" },
  { plan: "1 month plan", status: "Active", startDate: "05/2025" },
  { plan: "1 month plan", status: "Active", startDate: "06/2025" },
  { plan: "3 month plan", status: "Inactive", startDate: "07/2025" },
  { plan: "6 month plan", status: "Active", startDate: "01/2025" },
  { plan: "1 year plan", status: "Inactive", startDate: "02/2025" },
  { plan: "1 month plan", status: "Active", startDate: "03/2025" },
  { plan: "3 month plan", status: "Inactive", startDate: "04/2025" },
  { plan: "6 month plan", status: "Active", startDate: "05/2025" },
  { plan: "1 year plan", status: "Inactive", startDate: "06/2025" },
  { plan: "3 month plan", status: "Active", startDate: "07/2025" },
];

// === HELPER FUNCTION ===
function getChartColorsArray(r) {
  if (document.getElementById(r)) {
    let colors = document.getElementById(r).getAttribute("data-colors");
    colors = JSON.parse(colors);
    return colors.map(function (value) {
      const trimmed = value.replace(" ", "");
      if (trimmed.indexOf(",") === -1) {
        const cssVar = getComputedStyle(
          document.documentElement
        ).getPropertyValue(trimmed);
        return cssVar || trimmed;
      }
      const parts = value.split(",");
      if (parts.length !== 2) return trimmed;
      return (
        "rgba(" +
        getComputedStyle(document.documentElement).getPropertyValue(parts[0]) +
        "," +
        parts[1] +
        ")"
      );
    });
  }
}

// Global variable to store the chart instance
let pieChart;

// Function to render or update the Pie Chart
function renderPieChart(filteredMembers) {
  const planCounts = {};
  filteredMembers.forEach(({ plan }) => {
    planCounts[plan] = (planCounts[plan] || 0) + 1;
  });

  const pieLabels = Object.keys(planCounts);
  const pieSeries = pieLabels.map((label) => planCounts[label]);
  const totalMembers = pieSeries.reduce((a, b) => a + b, 0);
  const chartPieBasicColors = getChartColorsArray("simple_pie_chart");

  if (chartPieBasicColors) {
    const options = {
      series: pieSeries,
      chart: {
        height: 300,
        type: "pie",
        events: {
          dataPointSelection: function (event, chartContext, config) {
            alert(
              `Selected: ${pieLabels[config.dataPointIndex]} (${
                pieSeries[config.dataPointIndex]
              } members)`
            );
          },
        },
      },
      labels: pieLabels,
      legend: { position: "bottom" },
      tooltip: {
        y: {
          formatter: function (val, { seriesIndex, dataPointIndex, w }) {
            const count = w.config.series[seriesIndex]; // Get the count directly
            const percentage = ((count / totalMembers) * 100).toFixed(1);
            return `${percentage}% (${count} members)`;
          },
        },
      },
      colors: chartPieBasicColors,
    };

    // If chart already exists, update it, otherwise create a new one
    if (pieChart) {
      pieChart.updateOptions(options);
    } else {
      pieChart = new ApexCharts(
        document.querySelector("#simple_pie_chart"),
        options
      );
      pieChart.render();
    }
  }
}

// Initial render of the pie chart with all members when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  renderPieChart(members);
});

// Event listener for the "Generate Report" button
document
  .getElementById("generateReportBtn")
  .addEventListener("click", function () {
    const fromDateStr = document.getElementById("fromDate").value;
    const toDateStr = document.getElementById("toDate").value;

    if (!fromDateStr || !toDateStr) {
      alert("Please select both 'From Date' and 'To Date'.");
      return;
    }

    // Convert MM/YYYY strings to Date objects for comparison
    // We'll use the 1st day of the month for 'from' and the last day for 'to'
    const [fromMonth, fromYear] = fromDateStr.split("/").map(Number);
    const [toMonth, toYear] = toDateStr.split("/").map(Number);

    const fromDate = new Date(fromYear, fromMonth - 1, 1); // Month is 0-indexed
    const toDate = new Date(toYear, toMonth, 0); // Day 0 of next month gives last day of current month (e.g., new Date(2025, 7, 0) gives July 31, 2025)

    const filteredMembers = members.filter((member) => {
      if (!member.startDate) return false; // Skip members without a startDate

      const [memberMonth, memberYear] = member.startDate.split("/").map(Number);
      const memberDate = new Date(memberYear, memberMonth - 1, 1); // Create a Date object for the member's start date (first day of their month)

      // Check if memberDate is within the selected range (inclusive)
      return memberDate >= fromDate && memberDate <= toDate;
    });

    renderPieChart(filteredMembers);
  });

// === PLAN-WISE STATUS RADAR CHART (no "Pending") - Kept for completeness if you decide to use it later ===
// Note: This chart is not connected to the date filter in this provided code.
const planTypes = [
  "1 month plan",
  "3 month plan",
  "6 month plan",
  "1 year plan",
];
const planStatusCounts = {};
planTypes.forEach((plan) => {
  planStatusCounts[plan] = { Active: 0, Inactive: 0 };
});
members.forEach(({ plan, status }) => {
  const normalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (normalizedStatus !== "Pending" && planStatusCounts[plan]) {
    planStatusCounts[plan][normalizedStatus]++;
  }
});

// Dummy getChartColorsArray for 'basic_radar' since it's commented out in HTML
// If you uncomment the radar chart in HTML, make sure 'basic_radar' has data-colors
function getRadarChartColorsArray(id) {
  const el = document.getElementById(id);
  if (el) {
    let colors = el.getAttribute("data-colors");
    if (colors) {
      colors = JSON.parse(colors);
      return colors.map(function (value) {
        const trimmed = value.replace(" ", "");
        if (trimmed.indexOf(",") === -1) {
          const cssVar = getComputedStyle(
            document.documentElement
          ).getPropertyValue(trimmed);
          return cssVar || trimmed;
        }
        const parts = value.split(",");
        if (parts.length !== 2) return trimmed;
        return (
          "rgba(" +
          getComputedStyle(document.documentElement).getPropertyValue(
            parts[0]
          ) +
          "," +
          parts[1] +
          ")"
        );
      });
    }
  }
  // Default colors if element or data-colors attribute is not found
  return ["#008FFB", "#00E396"];
}

const activeData = planTypes.map((p) => planStatusCounts[p].Active);
const inactiveData = planTypes.map((p) => planStatusCounts[p].Inactive);
const planChartColors = getRadarChartColorsArray("basic_radar"); // Using a separate function to avoid issues if radar chart is not in HTML

// Check if the radar chart element exists before trying to render
const radarChartElement = document.querySelector("#basic_radar");
if (radarChartElement && planChartColors) {
  const options1 = {
    series: [
      { name: "Active", data: activeData },
      { name: "Inactive", data: inactiveData },
    ],
    chart: {
      height: 350,
      type: "radar",
      toolbar: { show: false },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          alert(
            `Selected: ${config.w.config.series[config.seriesIndex].name} - ${
              config.w.config.xaxis.categories[config.dataPointIndex]
            } (${
              config.w.config.series[config.seriesIndex].data[
                config.dataPointIndex
              ]
            })`
          );
        },
      },
    },
    colors: planChartColors,
    xaxis: { categories: planTypes },
  };
  new ApexCharts(radarChartElement, options1).render();
}

// ##################################
