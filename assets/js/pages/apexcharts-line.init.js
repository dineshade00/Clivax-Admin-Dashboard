// Function to get chart colors (already present in your code)
function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var t = document.getElementById(e).getAttribute("data-colors");
    if (t)
      return (t = JSON.parse(t)).map(function(e) {
        var t = e.replace(" ", "");
        if (-1 === t.indexOf(",")) {
          var a = getComputedStyle(document.documentElement).getPropertyValue(
            t
          );
          return a || t;
        }
        var r = e.split(",");
        return 2 != r.length ?
          t :
          "rgba(" +
          getComputedStyle(document.documentElement).getPropertyValue(
            r[0]
          ) +
          "," +
          r[1] +
          ")";
      });
  }
}

// All your existing chart initializations (linechartBasicColors, linechartZoomColors, etc.)
// ... (the code for other charts remains here as it was) ...

var linechartBasicColors = getChartColorsArray("line_chart_basic");
linechartBasicColors && (options = {
  series: [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: !1
    },
    toolbar: {
      show: !1
    }
  },
  markers: {
    size: 4
  },
  dataLabels: {
    enabled: !1
  },
  grid: {
    row: {
      colors: ["#eff2f7", "transparent"],
      opacity: .5
    },
    borderColor: "#000"
  },
  stroke: {
    curve: "straight"
  },
  colors: linechartBasicColors,
  title: {
    text: "Product Trends by Month",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  }
}, (chart = new ApexCharts(document.querySelector("#line_chart_basic"), options)).render());
var linechartZoomColors = getChartColorsArray("line_chart_zoomable");
linechartZoomColors && (options = {
  series: [{
    name: "XYZ MOTORS",
    data: [{
      x: new Date("2018-01-12").getTime(),
      y: 140
    }, {
      x: new Date("2018-01-13").getTime(),
      y: 147
    }, {
      x: new Date("2018-01-14").getTime(),
      y: 150
    }, {
      x: new Date("2018-01-15").getTime(),
      y: 154
    }, {
      x: new Date("2018-01-16").getTime(),
      y: 160
    }, {
      x: new Date("2018-01-17").getTime(),
      y: 165
    }, {
      x: new Date("2018-01-18").getTime(),
      y: 162
    }, {
      x: new Date("2018-01-20").getTime(),
      y: 159
    }, {
      x: new Date("2018-01-21").getTime(),
      y: 164
    }, {
      x: new Date("2018-01-22").getTime(),
      y: 160
    }, {
      x: new Date("2018-01-23").getTime(),
      y: 165
    }, {
      x: new Date("2018-01-24").getTime(),
      y: 169
    }, {
      x: new Date("2018-01-25").getTime(),
      y: 172
    }, {
      x: new Date("2018-01-26").getTime(),
      y: 177
    }, {
      x: new Date("2018-01-27").getTime(),
      y: 173
    }, {
      x: new Date("2018-01-28").getTime(),
      y: 169
    }, {
      x: new Date("2018-01-29").getTime(),
      y: 163
    }, {
      x: new Date("2018-01-30").getTime(),
      y: 158
    }, {
      x: new Date("2018-02-01").getTime(),
      y: 153
    }, {
      x: new Date("2018-02-02").getTime(),
      y: 149
    }, {
      x: new Date("2018-02-03").getTime(),
      y: 144
    }, {
      x: new Date("2018-02-05").getTime(),
      y: 150
    }, {
      x: new Date("2018-02-06").getTime(),
      y: 155
    }, {
      x: new Date("2018-02-07").getTime(),
      y: 159
    }, {
      x: new Date("2018-02-08").getTime(),
      y: 163
    }, {
      x: new Date("2018-02-09").getTime(),
      y: 156
    }, {
      x: new Date("2018-02-11").getTime(),
      y: 151
    }, {
      x: new Date("2018-02-12").getTime(),
      y: 157
    }, {
      x: new Date("2018-02-13").getTime(),
      y: 161
    }, {
      x: new Date("2018-02-14").getTime(),
      y: 150
    }, {
      x: new Date("2018-02-15").getTime(),
      y: 154
    }, {
      x: new Date("2018-02-16").getTime(),
      y: 160
    }, {
      x: new Date("2018-02-17").getTime(),
      y: 165
    }, {
      x: new Date("2018-02-18").getTime(),
      y: 162
    }, {
      x: new Date("2018-02-20").getTime(),
      y: 159
    }, {
      x: new Date("2018-02-21").getTime(),
      y: 164
    }, {
      x: new Date("2018-02-22").getTime(),
      y: 160
    }, {
      x: new Date("2018-02-23").getTime(),
      y: 165
    }, {
      x: new Date("2018-02-24").getTime(),
      y: 169
    }, {
      x: new Date("2018-02-25").getTime(),
      y: 172
    }, {
      x: new Date("2018-02-26").getTime(),
      y: 177
    }, {
      x: new Date("2018-02-27").getTime(),
      y: 173
    }, {
      x: new Date("2018-02-28").getTime(),
      y: 169
    }, {
      x: new Date("2018-02-29").getTime(),
      y: 163
    }, {
      x: new Date("2018-02-30").getTime(),
      y: 162
    }, {
      x: new Date("2018-03-01").getTime(),
      y: 158
    }, {
      x: new Date("2018-03-02").getTime(),
      y: 152
    }, {
      x: new Date("2018-03-03").getTime(),
      y: 147
    }, {
      x: new Date("2018-03-05").getTime(),
      y: 142
    }, {
      x: new Date("2018-03-06").getTime(),
      y: 147
    }, {
      x: new Date("2018-03-07").getTime(),
      y: 151
    }, {
      x: new Date("2018-03-08").getTime(),
      y: 155
    }, {
      x: new Date("2018-03-09").getTime(),
      y: 159
    }, {
      x: new Date("2018-03-11").getTime(),
      y: 162
    }, {
      x: new Date("2018-03-12").getTime(),
      y: 157
    }, {
      x: new Date("2018-03-13").getTime(),
      y: 161
    }, {
      x: new Date("2018-03-14").getTime(),
      y: 166
    }, {
      x: new Date("2018-03-15").getTime(),
      y: 169
    }, {
      x: new Date("2018-03-16").getTime(),
      y: 172
    }, {
      x: new Date("2018-03-17").getTime(),
      y: 177
    }, {
      x: new Date("2018-03-18").getTime(),
      y: 181
    }, {
      x: new Date("2018-03-20").getTime(),
      y: 178
    }, {
      x: new Date("2018-03-21").getTime(),
      y: 173
    }, {
      x: new Date("2018-03-22").getTime(),
      y: 169
    }, {
      x: new Date("2018-03-23").getTime(),
      y: 163
    }, {
      x: new Date("2018-03-24").getTime(),
      y: 159
    }, {
      x: new Date("2018-03-25").getTime(),
      y: 164
    }, {
      x: new Date("2018-03-26").getTime(),
      y: 168
    }, {
      x: new Date("2018-03-27").getTime(),
      y: 172
    }, {
      x: new Date("2018-03-28").getTime(),
      y: 169
    }, {
      x: new Date("2018-03-29").getTime(),
      y: 163
    }, {
      x: new Date("2018-03-30").getTime(),
      y: 162
    }, {
      x: new Date("2018-04-01").getTime(),
      y: 158
    }, {
      x: new Date("2018-04-02").getTime(),
      y: 152
    }, {
      x: new Date("2018-04-03").getTime(),
      y: 147
    }, {
      x: new Date("2018-04-05").getTime(),
      y: 142
    }, {
      x: new Date("2018-04-06").getTime(),
      y: 147
    }, {
      x: new Date("2018-04-07").getTime(),
      y: 151
    }, {
      x: new Date("2018-04-08").getTime(),
      y: 155
    }, {
      x: new Date("2018-04-09").getTime(),
      y: 159
    }, {
      x: new Date("2018-04-11").getTime(),
      y: 162
    }, {
      x: new Date("2018-04-12").getTime(),
      y: 157
    }, {
      x: new Date("2018-04-13").getTime(),
      y: 161
    }, {
      x: new Date("2018-04-14").getTime(),
      y: 166
    }, {
      x: new Date("2018-04-15").getTime(),
      y: 169
    }, {
      x: new Date("2018-04-16").getTime(),
      y: 172
    }, {
      x: new Date("2018-04-17").getTime(),
      y: 177
    }, {
      x: new Date("2018-04-18").getTime(),
      y: 181
    }, {
      x: new Date("2018-04-20").getTime(),
      y: 178
    }, {
      x: new Date("2018-04-21").getTime(),
      y: 173
    }, {
      x: new Date("2018-04-22").getTime(),
      y: 169
    }, {
      x: new Date("2018-04-23").getTime(),
      y: 163
    }, {
      x: new Date("2018-04-24").getTime(),
      y: 159
    }, {
      x: new Date("2018-04-25").getTime(),
      y: 164
    }, {
      x: new Date("2018-04-26").getTime(),
      y: 168
    }, {
      x: new Date("2018-04-27").getTime(),
      y: 172
    }, {
      x: new Date("2018-04-28").getTime(),
      y: 169
    }, {
      x: new Date("2018-04-29").getTime(),
      y: 163
    }, {
      x: new Date("2018-04-30").getTime(),
      y: 162
    }, {
      x: new Date("2018-05-01").getTime(),
      y: 158
    }, {
      x: new Date("2018-05-02").getTime(),
      y: 152
    }, {
      x: new Date("2018-05-03").getTime(),
      y: 147
    }, {
      x: new Date("2018-05-04").getTime(),
      y: 142
    }, {
      x: new Date("2018-05-05").getTime(),
      y: 147
    }, {
      x: new Date("2018-05-07").getTime(),
      y: 151
    }, {
      x: new Date("2018-05-08").getTime(),
      y: 155
    }, {
      x: new Date("2018-05-09").getTime(),
      y: 159
    }, {
      x: new Date("2018-05-11").getTime(),
      y: 162
    }, {
      x: new Date("2018-05-12").getTime(),
      y: 157
    }, {
      x: new Date("2018-05-13").getTime(),
      y: 161
    }, {
      x: new Date("2018-05-14").getTime(),
      y: 166
    }, {
      x: new Date("2018-05-15").getTime(),
      y: 169
    }, {
      x: new Date("2018-05-16").getTime(),
      y: 172
    }, {
      x: new Date("2018-05-17").getTime(),
      y: 177
    }, {
      x: new Date("2018-05-18").getTime(),
      y: 181
    }, {
      x: new Date("2018-05-20").getTime(),
      y: 178
    }, {
      x: new Date("2018-05-21").getTime(),
      y: 173
    }, {
      x: new Date("2018-05-22").getTime(),
      y: 169
    }, {
      x: new Date("2018-05-23").getTime(),
      y: 163
    }, {
      x: new Date("2018-05-24").getTime(),
      y: 159
    }, {
      x: new Date("2018-05-25").getTime(),
      y: 164
    }, {
      x: new Date("2018-05-26").getTime(),
      y: 168
    }, {
      x: new Date("2018-05-27").getTime(),
      y: 172
    }, {
      x: new Date("2018-05-28").getTime(),
      y: 169
    }, {
      x: new Date("2018-05-29").getTime(),
      y: 163
    }, {
      x: new Date("2018-05-30").getTime(),
      y: 162}
    ]}
  ],
  chart: {
    type: "area",
    stacked: !1,
    height: 350,
    zoom: {
      type: "x",
      enabled: !0,
      autoScaleYaxis: !0
    },
    toolbar: {
      autoSelected: "zoom"
    }
  },
  colors: linechartZoomColors,
  dataLabels: {
    enabled: !1
  },
  markers: {
    size: 0
  },
  title: {
    text: "Stock Price Movement",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: .5,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  yaxis: {
    showAlways: !0,
    labels: {
      show: !0,
      formatter: function(e) {
        return (e / 1e6).toFixed(0)
      }
    },
    title: {
      text: "Price",
      style: {
        fontWeight: 500
      }
    }
  },
  xaxis: {
    type: "datetime"
  },
  tooltip: {
    shared: !1,
    y: {
      formatter: function(e) {
        return (e / 1e6).toFixed(0)
      }
    }
  }
}, (chart = new ApexCharts(document.querySelector("#line_chart_zoomable"), options)).render());
var linechartDashedColors = getChartColorsArray("line_chart_dashed");
linechartDashedColors && (options = {
  chart: {
    height: 380,
    type: "line",
    zoom: {
      enabled: !1
    },
    toolbar: {
      show: !1
    }
  },
  colors: linechartDashedColors,
  dataLabels: {
    enabled: !1
  },
  stroke: {
    width: [3, 4, 3],
    curve: "straight",
    dashArray: [0, 8, 5]
  },
  series: [{
    name: "Session Duration",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
  }, {
    name: "Page Views",
    data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
  }, {
    name: "Total Visits",
    data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49]
  }],
  title: {
    text: "Page Statistics",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan", "08 Jan", "09 Jan", "10 Jan", "11 Jan", "12 Jan"]
  },
  tooltip: {
    y: [{
      title: {
        formatter: function(e) {
          return e + " (mins)"
        }
      }
    }, {
      title: {
        formatter: function(e) {
          return e + " per session"
        }
      }
    }, {
      title: {
        formatter: function(e) {
          return e
        }
      }
    }]
  },
  grid: {
    borderColor: "#f1f1f1"
  }
}, (chart = new ApexCharts(document.querySelector("#line_chart_dashed"), options)).render());
var linechartannotationsColors = getChartColorsArray("line_chart_annotations");

function generateDayWiseTimeSeries(e, t, a) {
  for (var r = 0, i = []; r < t;) {
    var n = e,
      o = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
    i.push([n, o]), e += 864e5, r++
  }
  return i
}
linechartannotationsColors && (options = {
  series: [{
    data: series.monthDataSeries1.prices
  }],
  chart: {
    height: 350,
    type: "line",
    id: "areachart-2",
    toolbar: {
      show: !1
    }
  },
  annotations: {
    yaxis: [{
      y: 8200,
      borderColor: "#038edc",
      label: {
        borderColor: "#038edc",
        style: {
          color: "#fff",
          background: "#038edc"
        },
        text: "Support"
      }
    }, {
      y: 8600,
      y2: 9e3,
      borderColor: "#f7cc53",
      fillColor: "#f7cc53",
      opacity: .2,
      label: {
        borderColor: "#f7cc53",
        style: {
          fontSize: "10px",
          color: "#000",
          background: "#f7cc53"
        },
        text: "Y-axis range"
      }
    }],
    xaxis: [{
      x: new Date("23 Nov 2017").getTime(),
      strokeDashArray: 0,
      borderColor: "#564ab1",
      label: {
        borderColor: "#564ab1",
        style: {
          color: "#fff",
          background: "#564ab1"
        },
        text: "Anno Test"
      }
    }, {
      x: new Date("26 Nov 2017").getTime(),
      x2: new Date("28 Nov 2017").getTime(),
      fillColor: "#51d28c",
      opacity: .4,
      label: {
        borderColor: "#000",
        style: {
          fontSize: "10px",
          color: "#fff",
          background: "#000"
        },
        offsetY: -10,
        text: "X-axis range"
      }
    }],
    points: [{
      x: new Date("01 Dec 2017").getTime(),
      y: 8607.55,
      marker: {
        size: 8,
        fillColor: "#fff",
        strokeColor: "red",
        radius: 2,
        cssClass: "apexcharts-custom-class"
      },
      label: {
        borderColor: "#f34e4e",
        offsetY: 0,
        style: {
          color: "#fff",
          background: "#f34e4e"
        },
        text: "Point Annotation"
      }
    }, {
      x: new Date("08 Dec 2017").getTime(),
      y: 9340.85,
      marker: {
        size: 0
      },
      image: {
        path: "./assets/images/logo-sm.png",
        width: 40,
        height: 40
      }
    }]
  },
  dataLabels: {
    enabled: !1
  },
  stroke: {
    curve: "straight"
  },
  colors: linechartannotationsColors,
  grid: {
    padding: {
      right: 30,
      left: 20
    }
  },
  title: {
    text: "Line with Annotations",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  labels: series.monthDataSeries1.dates,
  xaxis: {
    type: "datetime"
  }
}, (chart = new ApexCharts(document.querySelector("#line_chart_annotations"), options)).render());
var data = generateDayWiseTimeSeries(new Date("11 Feb 2017").getTime(), 185, {
    min: 30,
    max: 90
  }),
  brushchartLine2Colors = getChartColorsArray("brushchart_line2");
brushchartLine2Colors && (options = {
  series: [{
    data: data
  }],
  chart: {
    id: "chart2",
    type: "line",
    height: 220,
    toolbar: {
      autoSelected: "pan",
      show: !1
    }
  },
  colors: brushchartLine2Colors,
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: !1
  },
  fill: {
    opacity: 1
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: "datetime"
  }
}, (chart = new ApexCharts(document.querySelector("#brushchart_line2"), options)).render());
var brushchartLineColors = getChartColorsArray("brushchart_line");
brushchartLineColors && (optionsLine = {
  series: [{
    data: data
  }],
  chart: {
    id: "chart1",
    height: 130,
    type: "area",
    brush: {
      target: "chart2",
      enabled: !0
    },
    selection: {
      enabled: !0,
      xaxis: {
        min: new Date("19 Jun 2017").getTime(),
        max: new Date("14 Aug 2017").getTime()
      }
    }
  },
  colors: brushchartLineColors,
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: .91,
      opacityTo: .1
    }
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: !1
    }
  },
  yaxis: {
    tickAmount: 2
  }
}, (chartLine = new ApexCharts(document.querySelector("#brushchart_line"), optionsLine)).render());
var steplineChartColors = getChartColorsArray("line_chart_stepline");
steplineChartColors && (options = {
  series: [{
    data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
  }],
  chart: {
    type: "line",
    height: 350,
    toolbar: {
      show: !1
    }
  },
  stroke: {
    curve: "stepline"
  },
  dataLabels: {
    enabled: !1
  },
  title: {
    text: "Stepline Chart",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  markers: {
    hover: {
      sizeOffset: 4
    }
  },
  colors: steplineChartColors
}, (chart = new ApexCharts(document.querySelector("#line_chart_stepline"), options)).render());
var lineChartGradientColors = getChartColorsArray("line_chart_gradient");
lineChartGradientColors && (options = {
  series: [{
    name: "Likes",
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
  }],
  chart: {
    height: 350,
    type: "line",
    toolbar: {
      show: !1
    }
  },
  forecastDataPoints: {
    count: 7
  },
  stroke: {
    width: 5,
    curve: "smooth"
  },
  xaxis: {
    type: "datetime",
    categories: ["1/11/2001", "2/11/2001", "3/11/2001", "4/11/2001", "5/11/2001", "6/11/2001", "7/11/2001", "8/11/2001", "9/11/2001", "10/11/2001", "11/11/2001", "12/11/2001", "1/11/2002", "2/11/2002", "3/11/2002", "4/11/2002", "5/11/2002", "6/11/2002"],
    tickAmount: 10
  },
  title: {
    text: "Social Media",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: lineChartGradientColors,
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    }
  },
  markers: {
    size: 4,
    colors: ["#038edc"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 7
    }
  },
  yaxis: {
    min: -10,
    max: 40,
    title: {
      text: "Engagement"
    }
  }
}, (chart = new ApexCharts(document.querySelector("#line_chart_gradient"), options)).render());
var chart, linechartMissingDataColors = getChartColorsArray("line_chart_missing_data");
linechartMissingDataColors && (options = {
  series: [{
    name: "Peter",
    data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9]
  }, {
    name: "Johnny",
    data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null]
  }, {
    name: "David",
    data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null]
  }],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: !1
    },
    animations: {
      enabled: !1
    }
  },
  stroke: {
    width: [5, 5, 4],
    curve: "straight"
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  title: {
    text: "Missing data (null values)",
    style: {
      fontWeight: 500
    }
  },
  xaxis: {},
  colors: linechartMissingDataColors
}, (chart = new ApexCharts(document.querySelector("#line_chart_missing_data"), options)).render());
var lastDate = 0,
  data = [],
  TICKINTERVAL = 864e5,
  XAXISRANGE = 7776e5;

function getDayWiseTimeSeries(e, t, a) {
  for (var r = 0; r < t;) {
    var i = e,
      n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
    data.push({
      x: i,
      y: n
    }), lastDate = e, e += TICKINTERVAL, r++
  }
}

function getNewSeries(e, t) {
  var a = e + TICKINTERVAL;
  lastDate = a;
  for (var r = 0; r < data.length - 10; r++) data[r].x = a - XAXISRANGE - TICKINTERVAL, data[r].y = 0;
  data.push({
    x: a,
    y: Math.floor(Math.random() * (t.max - t.min + 1)) + t.min
  })
}

function resetData() {
  data = data.slice(data.length - 10, data.length)
}
getDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 10, {
  min: 10,
  max: 90
});
var options, charts, linechartrealtimeColors = getChartColorsArray("line_chart_realtime");

function generateDayWiseTimeSeriesline(e, t, a) {
  for (var r = 0, i = []; r < t;) {
    var n = e,
      o = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
    i.push([n, o]), e += 864e5, r++
  }
  return i
}
linechartrealtimeColors && (options = {
  series: [{
    data: data.slice()
  }],
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    animations: {
      enabled: !0,
      easing: "linear",
      dynamicAnimation: {
        speed: 1e3
      }
    },
    toolbar: {
      show: !1
    },
    zoom: {
      enabled: !1
    }
  },
  dataLabels: {
    enabled: !1
  },
  stroke: {
    curve: "smooth"
  },
  title: {
    text: "Dynamic Updating Chart",
    align: "left",
    style: {
      fontWeight: 500
    }
  },
  markers: {
    size: 0
  },
  colors: linechartrealtimeColors,
  xaxis: {
    type: "datetime",
    range: XAXISRANGE
  },
  yaxis: {
    max: 100
  },
  legend: {
    show: !1
  }
}, (charts = new ApexCharts(document.querySelector("#line_chart_realtime"), options)).render()), window.setInterval(function() {
  getNewSeries(lastDate, {
    min: 10,
    max: 90
  }), charts.updateSeries([{
    data: data
  }])
}, 1e3);
var optionsLine, chartLine, chartSyncingLine = getChartColorsArray("chart-syncing-line");
chartSyncingLine && (optionsLine = {
  series: [{
    data: generateDayWiseTimeSeriesline(new Date("11 Feb 2017").getTime(), 20, {
      min: 10,
      max: 60
    })
  }],
  chart: {
    id: "fb",
    group: "social",
    type: "line",
    height: 160,
    toolbar: {
      show: !1
    }
  },
  colors: chartSyncingLine,
  dataLabels: {
    enabled: !1
  },
  stroke: {
    curve: "straight",
    width: 3
  },
  toolbar: {
    tools: {
      selection: !1
    }
  },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  tooltip: {
    followCursor: !1,
    x: {
      show: !1
    },
    marker: {
      show: !1
    },
    y: {
      title: {
        formatter: function() {
          return ""
        }
      }
    }
  },
  grid: {
    clipMarkers: !1
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: "datetime"
  }
}, (chartLine = new ApexCharts(document.querySelector("#chart-syncing-line"), optionsLine)).render());
var optionsLine2, chartLine2, chartSyncingLine2 = getChartColorsArray("chart-syncing-line2");
chartSyncingLine2 && (optionsLine2 = {
  series: [{
    data: generateDayWiseTimeSeriesline(new Date("11 Feb 2017").getTime(), 20, {
      min: 10,
      max: 30
    })
  }],
  chart: {
    id: "tw",
    group: "social",
    type: "line",
    height: 160,
    toolbar: {
      show: !1
    }
  },
  colors: chartSyncingLine2,
  dataLabels: {
    enabled: !1
  },
  stroke: {
    curve: "straight",
    width: 3
  },
  toolbar: {
    tools: {
      selection: !1
    }
  },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  tooltip: {
    followCursor: !1,
    x: {
      show: !1
    },
    marker: {
      show: !1
    },
    y: {
      title: {
        formatter: function() {
          return ""
        }
      }
    }
  },
  grid: {
    clipMarkers: !1
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: "datetime"
  }
}, (chartLine2 = new ApexCharts(document.querySelector("#chart-syncing-line2"), optionsLine2)).render());
var optionsArea, chartArea, chartSyncingArea = getChartColorsArray("chart-syncing-area");
chartSyncingArea && (optionsArea = {
  series: [{
    data: generateDayWiseTimeSeriesline(new Date("11 Feb 2017").getTime(), 20, {
      min: 10,
      max: 60
    })
  }],
  chart: {
    id: "yt",
    group: "social",
    type: "area",
    height: 160,
    toolbar: {
      show: !1
    }
  },
  colors: chartSyncingArea,
  dataLabels: {
    enabled: !1
  },
  stroke: {
    curve: "straight",
    width: 3
  },
  toolbar: {
    tools: {
      selection: !1
    }
  },
  markers: {
    size: 4,
    hover: {
      size: 6
    }
  },
  tooltip: {
    followCursor: !1,
    x: {
      show: !1
    },
    marker: {
      show: !1
    },
    y: {
      title: {
        formatter: function() {
          return ""
        }
      }
    }
  },
  grid: {
    clipMarkers: !1
  },
  yaxis: {
    tickAmount: 2
  },
  xaxis: {
    type: "datetime"
  }
}, (chartArea = new ApexCharts(document.querySelector("#chart-syncing-area"), optionsArea)).render());


// Function to get chart colors (already present in your code)
function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var t = document.getElementById(e).getAttribute("data-colors");
    if (t)
      return (t = JSON.parse(t)).map(function(e) {
        var t = e.replace(" ", "");
        if (-1 === t.indexOf(",")) {
          var a = getComputedStyle(document.documentElement).getPropertyValue(
            t
          );
          return a || t;
        }
        var r = e.split(",");
        return 2 != r.length ?
          t :
          "rgba(" +
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
    series: [{
      name: "Active",
      data: initialActiveData,
    }, {
      name: "Inactive",
      data: initialInactiveData,
    }, ],
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
    responsive: [{
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
    }, ],
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
  .addEventListener("click", function() {
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
    const {
      categories,
      activeData,
      inactiveData
    } = generateDummyData(
      fromDate,
      toDate
    );

    // Update the chart with the new data
    if (chart) {
      chart.updateOptions({
        xaxis: {
          categories: categories,
        },
        series: [{
          name: "Active",
          data: activeData,
        }, {
          name: "Inactive",
          data: inactiveData,
        }, ],
      });
    } else {
      console.error(
        "Chart not initialized. Make sure #line_chart_datalabel exists."
      );
    }
  });
