

var linechartDatalabelColors = ["#34c38f", "#ff0000"]; // Green for Active, Red for Inactive
linechartDatalabelColors &&
  ((options = {
    chart: {
      height: 380,
      type: "line",
      zoom: { enabled: !1 },
      toolbar: { show: !1 },
    },
    colors: linechartDatalabelColors,
    dataLabels: { enabled: !1 },
    stroke: { width: [3, 3], curve: "straight" },
    series: [
      {
        name: "Active",
        data: [2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], // Month-wise Active
      },
      {
        name: "Inactive",
        data: [0, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 1], // Month-wise Inactive
      },
    ],
    title: {
      text: "Yearly Active and Inactive Members",
      align: "left",
      style: { fontWeight: 500 },
    },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      borderColor: "#f1f1f1",
    },
    markers: { style: "inverted", size: 6 },
    xaxis: {
      categories: [
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
      ],
      title: { text: "Month" },
    },
    yaxis: { title: { text: "Active & Inactive" }, min: 0, max: 5 },
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
        options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
      },
    ],
  }),
  (chart = new ApexCharts(
    document.querySelector("#line_chart_datalabel"),
    options
  )).render());

// === MEMBER DATA (from file) ===
const members = [
  { plan: "1 month plan", status: "Active" },
  { plan: "1 month plan", status: "Active" },
  { plan: "3 month plan", status: "Inactive" },
  { plan: "3 month plan", status: "Inactive" },
  { plan: "6 month plan", status: "Active" },
  { plan: "1 year plan", status: "Inactive" },
  { plan: "1 month plan", status: "Active" },
  { plan: "3 month plan", status: "Inactive" },
  { plan: "6 month plan", status: "Active" },
  { plan: "1 year plan", status: "Inactive" },
  { plan: "3 month plan", status: "Active" },
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

// === PIE CHART (Plan-wise Member Distribution - % based) ===
const planCounts = {};
members.forEach(({ plan }) => {
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
        formatter: function (val) {
          return `${((val / totalMembers) * 100).toFixed(1)}% (${val} members)`;
        },
      },
    },
    colors: chartPieBasicColors,
  };
  new ApexCharts(document.querySelector("#simple_pie_chart"), options).render();
}

// === PLAN-WISE STATUS RADAR CHART (no "Pending") ===
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
const activeData = planTypes.map((p) => planStatusCounts[p].Active);
const inactiveData = planTypes.map((p) => planStatusCounts[p].Inactive);
const planChartColors = getChartColorsArray("basic_radar");
if (planChartColors) {
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
  new ApexCharts(document.querySelector("#basic_radar"), options1).render();
}


