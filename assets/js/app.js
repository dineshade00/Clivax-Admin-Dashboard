!function (n) { "use strict"; function a() { for (var e = document.getElementById("topnav-menu-content").getElementsByTagName("a"), t = 0, n = e.length; t < n; t++)"nav-item dropdown active" === e[t].parentElement.getAttribute("class") && (e[t].parentElement.classList.remove("active"), e[t].nextElementSibling.classList.remove("show")) } function e() { document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || (console.log("pressed"), n("body").removeClass("fullscreen-enable")) } document.addEventListener("scroll", function () { var e; (e = document.getElementById("page-topbar")) && (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop ? e.classList.add("topbar-shadow") : e.classList.remove("topbar-shadow")) }), n("#side-menu").metisMenu(), n("#sidebar-btn").on("click", function (e) { e.preventDefault(), n("body").toggleClass("sidebar-enable"), 992 <= n(window).width() ? n("body").toggleClass("sidebar-collpsed") : n("body").removeClass("sidebar-collpsed") }), n("body,html").click(function (e) { var t = n("#sidebar-btn"); t.is(e.target) || 0 !== t.has(e.target).length || e.target.closest("div.vertical-menu") || n("body").removeClass("sidebar-enable") }), n("#sidebar-menu a").each(function () { var e = window.location.href.split(/[?#]/)[0]; this.href == e && (n(this).addClass("active"), n(this).parent().addClass("mm-active"), n(this).parent().parent().addClass("mm-show"), n(this).parent().parent().prev().addClass("mm-active"), n(this).parent().parent().parent().addClass("mm-active"), n(this).parent().parent().parent().parent().addClass("mm-show"), n(this).parent().parent().parent().parent().parent().addClass("mm-active")) }), n(".navbar-nav a").each(function () { var e = window.location.href.split(/[?#]/)[0]; this.href == e && (n(this).addClass("active"), n(this).parent().addClass("active"), n(this).parent().parent().addClass("active"), n(this).parent().parent().parent().addClass("active"), n(this).parent().parent().parent().parent().addClass("active"), n(this).parent().parent().parent().parent().parent().addClass("active")) }), n(document).ready(function () { var e; 0 < n("#sidebar-menu").length && 0 < n("#sidebar-menu .mm-active .active").length && (300 < (e = n("#sidebar-menu .mm-active .active").offset().top) && (e -= 300, n(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: e }, "slow"))) }), n('[data-toggle="fullscreen"]').on("click", function (e) { e.preventDefault(), n("body").toggleClass("fullscreen-enable"), document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) }), document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), document.addEventListener("mozfullscreenchange", e), n(".right-bar-toggle").on("click", function (e) { n("body").toggleClass("right-bar-enabled") }), n(document).on("click", "body", function (e) { 0 < n(e.target).closest(".right-bar-toggle, .right-bar").length || n("body").removeClass("right-bar-enabled") }), function () { if (document.getElementById("topnav-menu-content")) { for (var e = document.getElementById("topnav-menu-content").getElementsByTagName("a"), t = 0, n = e.length; t < n; t++)e[t].onclick = function (e) { "#" === e.target.getAttribute("href") && (e.target.parentElement.classList.toggle("active"), e.target.nextElementSibling.classList.toggle("show")) }; window.addEventListener("resize", a) } }(), [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) { return new bootstrap.Tooltip(e) }), [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (e) { return new bootstrap.Popover(e) }), n(window).on("load", function () { n("#status").fadeOut(), n("#preloader").delay(350).fadeOut("slow") }), function () { var t = document.documentElement; t.hasAttribute("data-bs-theme") && "light" == t.getAttribute("data-bs-theme") ? sessionStorage.setItem("data-layout-mode", "light") : "dark" == t.getAttribute("data-bs-theme") && sessionStorage.setItem("data-layout-mode", "dark"), null == sessionStorage.getItem("data-layout-mode") ? t.setAttribute("data-bs-theme", "light") : sessionStorage.getItem("data-layout-mode") && t.setAttribute("data-bs-theme", sessionStorage.getItem("data-layout-mode")); var e = document.getElementById("light-dark-mode"); e && e.addEventListener("click", function (e) { t.hasAttribute("data-bs-theme") && "dark" == t.getAttribute("data-bs-theme") ? (t.setAttribute("data-bs-theme", "light"), sessionStorage.setItem("data-layout-mode", "light")) : (t.setAttribute("data-bs-theme", "dark"), sessionStorage.setItem("data-layout-mode", "dark")) }); var n = document.getElementById("layout-dir-btn"); n && n.addEventListener("click", function (e) { t.hasAttribute("dir") && "rtl" == t.getAttribute("dir") ? (t.setAttribute("dir", "ltr"), document.getElementById("bootstrap-style").setAttribute("href", "assets/css/bootstrap.min.css"), document.getElementById("app-style").setAttribute("href", "assets/css/app.min.css"), this.innerHTML = "RTL") : (t.setAttribute("dir", "rtl"), document.getElementById("bootstrap-style").setAttribute("href", "assets/css/bootstrap-rtl.min.css"), document.getElementById("app-style").setAttribute("href", "assets/css/app-rtl.min.css"), this.innerHTML = "LTR") }) }(), Waves.init() }(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    var options = {
        chart: {
            height: 260,
            type: 'area',
            toolbar: { show: false },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        series: [{
            name: "Monthly Revenue",
            data: [12000, 15400, 14200, 16500, 17800, 19000, 20500, 18400, 21000, 22800, 24600, 26300]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        colors: ['#38c66c'],  // 💚 Your theme color
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 0.6,
                opacityTo: 0.1,
                stops: [0, 100]
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "₹" + val.toLocaleString();
                }
            }
        }
    };

    new ApexCharts(document.querySelector("#yearly_revenue_chart"), options).render();
});


// Equipment chart (can be bar or donut based on preference)
var options1 = {
    chart: {
        height: 200,
        type: 'bar',
        toolbar: { show: false },
    },
    series: [{
        name: 'Usage',
        data: [48, 100, 40, 68, 56, 80, 92]
    }],
    xaxis: {
        categories: ['Treadmill', 'Dumbbells', 'Leg Press', 'Bike', 'Rowing', 'Pull-up', 'Chest'],
    },
    colors: ['#38c66c'],
};

var chart1 = new ApexCharts(document.querySelector("#equipment_chart"), options1);
chart1.render();


// Member source pie chart
var options2 = {
    chart: {
        type: 'donut',
        height: 250,
    },
    labels: ['Walk-in', 'Website', 'Social Media', 'Referral', 'App Booking'],
    series: [25, 30, 20, 15, 10],
    colors: ['#38c66c', '#343a40', '#6c757d', '#ffc107', '#0d6efd'],
    legend: {
        position: 'bottom'
    }
};

var chart2 = new ApexCharts(document.querySelector("#member_source_chart"), options2);
chart2.render();





// #######################
// Timezone 
// greeting.js

document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const hour = now.getHours();

    let greeting = "Hello";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 16) {
        greeting = "Good Afternoon";
    } else if (hour >= 16 && hour < 20) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    // 👇 Replace this with dynamic name from session/localStorage if available
    const userName = "Dinesh";

    // Inject into your HTML element
    const greetingElement = document.getElementById("greeting-text");
    if (greetingElement) {
        greetingElement.innerHTML = `${greeting}, <span class="text-primary">${userName}!</span>`;
    }
});


// add new account form js
(() => {
  'use strict';
  const form = document.querySelector('#salaryAccountForm'); // <-- updated ID
  const contactInput = document.querySelector('#staffID'); // or use any field to show in popup

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      const staffId = contactInput.value.trim();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        html: `Salary account for <strong>${staffId}</strong> has been successfully added.`,
        confirmButtonColor: '#3085d6'
      });
      form.reset();
      form.classList.remove('was-validated');
    }

    form.classList.add('was-validated');
  }, false);
})();





