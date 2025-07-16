var chartPieBasicColors = getChartColorsArray("simple_pie_chart");
chartPieBasicColors &&
  ((options = {
    series: [450000, 550000, 130000, 430000, 220000, 350000],
    chart: { height: 300, type: "pie" },
    labels: [
      "1 Month Plan",
      "3 Months Plan",
      "6 Months Plan",
      "1 Year PLan",
      "Couple Plan",
      "Custom Plan",
    ],
    legend: { position: "bottom" },
    dataLabels: { dropShadow: { enabled: !1 } }, // keeps % inside the slices
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val.toLocaleString("en-IN");
        },
      },
    },
    colors: chartPieBasicColors,
  }),
  (chart = new ApexCharts(
    document.querySelector("#simple_pie_chart"),
    options
  )).render());

///////

var chartRadarBasicColors = getChartColorsArray("basic_radar");
chartRadarBasicColors &&
  ((options = {
    series: [
      {
        name: "Revenue",
        data: [
          55000, 75000, 30000, 40000, 100000, 20000, 100000, 54000, 38000,
          500000, 98000, 240000,
        ],
      },
    ],
    chart: { height: 350, type: "radar", toolbar: { show: !1 } },
    colors: chartRadarBasicColors,
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  }),
  (chart = new ApexCharts(
    document.querySelector("#basic_radar"),
    options
  )).render());

/////////////////

var areachartSplineColors = getChartColorsArray("area_chart_spline");

if (areachartSplineColors) {
  var options = {
    series: [
      {
        name: "This Year",
        // Revenue values in thousands of rupees (₹) for each month
        data: [120, 150, 90, 180, 200, 220, 210, 230, 240, 260, 280, 300],
      },
      {
        name: "Last Year",
        data: [100, 130, 80, 160, 170, 190, 180, 200, 210, 230, 250, 270],
      },
    ],
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: areachartSplineColors,
    xaxis: {
      type: "category",
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
    },
    yaxis: {
      min: 0,
      max: 300, // up to ₹300k; adjust if your data exceeds this
      tickAmount: 6, // Generates ticks at 0, 50, 100, 150, 200, 250, 300
      labels: {
        formatter: function (value) {
          return "₹" + value + "k";
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return "₹" + value + "k";
        },
      },
    },
  };

  var chart = new ApexCharts(
    document.querySelector("#area_chart_spline"),
    options
  );
  chart.render();
}

//////////////////////

// Grab the theme‑aware color palette that your helper supplies
var chartDonutBasicColors = getChartColorsArray("simple_dount_chart");

if (chartDonutBasicColors) {
  const options = {
    // Numerical values for each slice (keep or replace with your own data)
    series: [44, 55, 41, 17, 15],

    // 🔹 New: human‑readable names for every slice
    labels: [
      "Memberships",
      "Day Passes",
      "Merchandise",
      "Group Classes",
      "Personal Training",
    ],

    chart: {
      height: 300,
      type: "donut",
    },

    legend: {
      position: "bottom",
    },

    dataLabels: {
      dropShadow: {
        enabled: false, // clearer than !1, but identical behavior
      },
    },

    colors: chartDonutBasicColors,
  };

  // Mount and render the chart
  const chart = new ApexCharts(
    document.querySelector("#simple_dount_chart"),
    options
  );
  chart.render();
}
