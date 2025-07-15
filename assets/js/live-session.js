$(document).ready(function () {
  // Unified icon set for all DataTables instances
  const paginateIcons = {
    first: "<i class='mdi mdi-chevron-double-left'></i>",
    previous: "<i class='mdi mdi-chevron-left'></i>",
    next: "<i class='mdi mdi-chevron-right'></i>",
    last: "<i class='mdi mdi-chevron-double-right'></i>",
  };

  // #datatable
  $("#datatable").DataTable({
    language: { paginate: paginateIcons },
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination");
    },
  });

  // #scroll-sidebar-datatable
  $("#scroll-sidebar-datatable").DataTable({
    scrollY: "350px",
    scrollCollapse: true,
    paging: true,
    language: { paginate: paginateIcons },
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination");
    },
  });

  // #alternative-page-datatable
  $("#alternative-page-datatable").DataTable({
    pagingType: "full_numbers",
    language: { paginate: paginateIcons },
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination");
      $(".dataTables_length select").addClass("form-select form-select-sm");
    },
  });

  // #datatable-1
  $("#datatable-1").DataTable({
    responsive: true,
    lengthMenu: [
      [5, 10, 25, 50, -1],
      [5, 10, 25, 50, "All"],
    ],
    language: { paginate: paginateIcons },
  });

  // Style the page‑length dropdown globally
  $(".dataTables_length select").addClass("form-select form-select-sm");
});

// Modal Script
$(document).on("click", ".trainer-link", function (e) {
  e.preventDefault();

  // Pull everything straight out of the clicked <a>
  const $el = $(this);
  $("#modalTrainerName").text($el.data("name"));
  $("#modalTrainerAge").text($el.data("age"));
  $("#modalTrainerGender").text($el.data("gender"));
  $("#modalTrainerExpertise").text($el.data("expertise"));
  $("#modalTrainerExperience").text($el.data("exp"));
  $("#modalTrainerSessions").text($el.data("sessions"));
  $("#trainerPhoto").attr("src", $el.data("photo"));

  // Show the modal
  bootstrap.Modal.getOrCreateInstance("#trainerModal").show();
});

//Validation Script
(() => {
  "use strict";

  // Fetch all forms we want to apply validation to
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          // Stop form submission if there are invalid fields
          event.preventDefault();
          event.stopPropagation();
        }
        // Add Bootstrap class to show feedback
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//  <!-- === UPDATED SCRIPT WITH EDIT FUNCTIONALITY === -->

$(function () {
  /* -------------------------------------------------------------
           0.  DataTable instance & state vars
        ------------------------------------------------------------- */
  const $table = $("#alternative-page-datatable");
  const dataTable = $.fn.DataTable.isDataTable($table)
    ? $table.DataTable()
    : $table.DataTable();

  // Pointer to the DataTables row that is currently being edited
  // (`null` when the form is in "Add" mode).
  let editingRow = null;

  /* -------------------------------------------------------------
           1.  Helpers – status & success modal
        ------------------------------------------------------------- */
  /** Compute the correct badge (Upcoming | Ongoing | Completed)  */
  function computeStatus(start, durationMin) {
    const now = new Date();
    const end = new Date(start.getTime() + durationMin * 60000);

    if (now < start) return { text: "Upcoming", cls: "bg-success" };
    if (now >= start && now <= end) return { text: "Ongoing", cls: "bg-info" };
    return { text: "Completed", cls: "bg-secondary" };
  }

  /** Refresh every row’s badge so they stay current */
  function updateStatuses() {
    $table.find("tbody tr").each(function () {
      const $tds = $(this).children("td");
      const rawDate = $tds
        .eq(2)
        .text()
        .replace(/\u00a0/g, " ")
        .replace(/[‑]/g, "-")
        .trim();
      const durMin = parseInt($tds.eq(3).text(), 10) || 0;
      const start = new Date(rawDate.replace(" ", "T")); // "YYYY-MM-DDTHH:MM"

      if (isNaN(start)) return;
      const st = computeStatus(start, durMin);
      $tds.eq(5).html(`<span class="badge ${st.cls}">${st.text}</span>`);
    });
  }

  /** SweetAlert2 success dialog (matches screenshot) */
  function showSuccess(msg) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: msg,
      confirmButtonText: "OK",
      width: 450,
      allowOutsideClick: false,
    });
  }

  /* -------------------------------------------------------------
           2.  Initial badge refresh + keep fresh on table redraw
        ------------------------------------------------------------- */
  updateStatuses();
  dataTable.on("draw", updateStatuses);

  /* -------------------------------------------------------------
           3.  Edit button → populate form & switch to ‘Edit’ mode
        ------------------------------------------------------------- */
  const form = document.querySelector(".needs-validation");
  const $cardTitle = $(form).closest(".card").find(".card-header .card-title");
  const $submitBtn = $(form).find('button[type="submit"]');

  $table.on("click", "button.btn-primary", function () {
    // Capture the DataTables row instance we’re about to edit
    editingRow = dataTable.row($(this).closest("tr"));
    if (!editingRow.length) return; // Safety

    const $tds = $(this).closest("tr").children("td");

    // ── extract the current row values ────────────────────────
    const title = $tds.eq(0).text().trim();
    const trainer = $tds.eq(1).text().trim();

    const rawDate = $tds
      .eq(2)
      .text()
      .replace(/\u00a0/g, " ")
      .replace(/[‑]/g, "-")
      .trim();
    const [datePart, timePart] = rawDate.split(" ");
    const datetimeVal = `${datePart}T${timePart}`; // value for <input type=datetime-local>

    const durationVal = parseInt($tds.eq(3).text().replace(/\D/g, ""), 10);
    const participantsVal = $tds.eq(4).text().trim();
    const linkVal = $tds.eq(6).find("a").attr("href");

    // ── populate the form ────────────────────────────────────
    $("#sessionTitle").val(title);
    $("#trainerName").val(trainer);
    $("#sessionDateTime").val(datetimeVal);
    $("#duration").val(durationVal);
    $("#participants").val(participantsVal);
    $("#sessionLink").val(linkVal);
    $("#note").val(""); // not stored in table → leave empty

    // Switch UI cues to ‘Edit’ mode
    $cardTitle.text("Edit Session");
    $submitBtn.text("Update Session");

    // Smooth‑scroll to the form for better UX
    $("html, body").animate(
      { scrollTop: $(form).closest(".card").offset().top - 80 },
      400
    );
  });

  /* -------------------------------------------------------------
           4.  Form submit → add row OR update existing row
        ------------------------------------------------------------- */
  form.addEventListener(
    "submit",
    function (e) {
      if (!form.checkValidity()) return; // Let native validation block if needed
      e.preventDefault();

      // ── collect the values from the form ────────────────────
      const title = $("#sessionTitle").val().trim();
      const trainer = $("#trainerName").val().trim();
      const startRaw = $("#sessionDateTime").val();
      const duration = $("#duration").val().trim();
      const participants = $("#participants").val().trim();
      const link = $("#sessionLink").val().trim();

      // Pretty date for the table: "YYYY‑MM‑DD HH:MM"
      const pad = (n) => String(n).padStart(2, "0");
      const prettyDate = (() => {
        const d = new Date(startRaw);
        return isNaN(d)
          ? startRaw
          : `${d.getFullYear()}‑${pad(d.getMonth() + 1)}‑${pad(
              d.getDate()
            )}&nbsp;${pad(d.getHours())}:${pad(d.getMinutes())}`;
      })();

      // Compute status for the new / updated row
      const stObj = (() => {
        const start = new Date(startRaw);
        return computeStatus(start, parseInt(duration, 10) || 0);
      })();

      const rowData = [
        title,
        trainer,
        prettyDate,
        `${duration}&nbsp;min`,
        participants,
        `<span class="badge ${stObj.cls}">${stObj.text}</span>`,
        `<a href="${link}" target="_blank">Join</a>`,
        '<button class="btn btn-sm btn-primary">Edit</button> ' +
          '<button class="btn btn-sm btn-danger">Delete</button>',
      ];

      /* --- CASE 1: Updating an existing row --- */
      if (editingRow) {
        editingRow.data(rowData).draw(false);
        updateStatuses();
        showSuccess("Session Updated Successfully...");

        // Reset edit state & UI cues
        editingRow = null;
        $cardTitle.text("Add New Online Session");
        $submitBtn.text("Submit form");
      } else {
        /* --- CASE 2: Adding a brand‑new row --- */
        dataTable.row.add(rowData).draw(false);
        showSuccess("New Session Added Successfully...");
      }

      // ── finally, clear and reset the form ───────────────────
      form.reset();
      form.classList.remove("was-validated");
    },
    false
  );

  /* -------------------------------------------------------------
           5.  Row delete (delegated)
        ------------------------------------------------------------- */
  $table.on("click", ".btn-danger", function () {
    dataTable.row($(this).closest("tr")).remove().draw(false);
  });
});

///////////////////////////////////////////////

// assets/js/live-session.js
// Dynamically build “Today’s Sessions” cards from the data‑table
// and keep them in sync whenever the user adds, edits, deletes, or paginates.

(function ($) {
  $(function () {
    /* -------------------------------------------------------------------------- */
    /*  1. Data‑table initialisation                                              */
    /* -------------------------------------------------------------------------- */
    var sessionTable = $.fn.DataTable.isDataTable("#alternative-page-datatable")
      ? $("#alternative-page-datatable").DataTable()
      : $("#alternative-page-datatable").DataTable({
          lengthChange: true,
          pageLength: 10,
          responsive: true,
        });

    /* -------------------------------------------------------------------------- */
    /*  2. Helpers                                                                 */
    /* -------------------------------------------------------------------------- */
    const cardStyles = [
      {
        bg: "bg-danger-subtle",
        shape: "assets/images/dashboard/dashboard-shape-1.png",
        avatar: "avatar-label-danger",
        icon: "mdi mdi-run-fast",
        text: "text-danger",
      },
      {
        bg: "bg-success-subtle",
        shape: "assets/images/dashboard/dashboard-shape-2.png",
        avatar: "avatar-label-success",
        icon: "mdi mdi-fire",
        text: "text-success",
      },
      {
        bg: "bg-info-subtle",
        shape: "assets/images/dashboard/dashboard-shape-3.png",
        avatar: "avatar-label-info",
        icon: "mdi mdi-yoga",
        text: "text-info",
      },
      {
        bg: "bg-warning-subtle",
        shape: "assets/images/dashboard/dashboard-shape-2.png",
        avatar: "avatar-label-warning",
        icon: "mdi mdi-weight-lifter",
        text: "text-warning",
      },
      {
        bg: "bg-primary-subtle",
        shape: "assets/images/dashboard/dashboard-shape-1.png",
        avatar: "avatar-label-primary",
        icon: "mdi mdi-star",
        text: "text-primary",
      },
    ];

    // Locate the container whose <h6 class="card-title"> starts with “Today”
    const todayRow = $(".card-title")
      .filter(function () {
        return $(this).text().trim().startsWith("Today");
      })
      .closest(".card")
      .find(".card-body > .row");

    function isToday(date) {
      const now = new Date();
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    }

    function inferPlatform(url) {
      if (!url) return "Online";
      const u = url.toLowerCase();
      if (u.includes("zoom")) return "Zoom";
      if (u.includes("meet.google")) return "Google Meet";
      if (u.includes("teams.microsoft")) return "Microsoft Teams";
      return "Online";
    }

    function createCard(data, idx) {
      const style = cardStyles[idx % cardStyles.length];
      const start = data.date;
      const end = new Date(start.getTime() + data.duration * 60000);

      const dateStr = start.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const timeStr =
        start.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }) +
        " - " +
        end.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });

      return `
      <div class="col-xl-4">
        <div class="card ${style.bg}" style="background:url('${style.shape}');background-repeat:no-repeat;background-position:bottom center;">
          <div class="card-body">
            <div class="d-flex">
              <div class="avatar avatar-sm ${style.avatar}">
                <i class="${style.icon} mt-1"></i>
              </div>
              <div class="ms-3">
                <p class="${style.text} mb-1">${data.title}</p>
                <h5 class="mb-0">Trainer:<br> ${data.trainer}</h5>
              </div>
            </div>
            <div class="mt-3 mb-2">
              <p class="mb-0"><strong>Date:</strong> ${dateStr}</p>
              <p class="mb-0"><strong>Time:</strong> ${timeStr}</p>
              <p class="mb-0"><strong>Platform:</strong> ${data.platform}</p>
            </div>
          </div>
        </div>
      </div>`;
    }

    /* -------------------------------------------------------------------------- */
    /*  3. Build cards from the full DataTable (all pages)                         */
    /* -------------------------------------------------------------------------- */
    function refreshTodayCards() {
      todayRow.empty();
      let idx = 0;
      let found = false;

      sessionTable.rows().every(function () {
        const rowNode = this.node();
        const cells = $(rowNode).find("td");
        if (cells.length < 7) return; // Safety‑check

        // Normalise special hyphens/spaces so split works reliably
        const rawDateTime = cells
          .eq(2)
          .text()
          .trim()
          .replace(/\u2011/g, "-")
          .replace(/\u00A0/g, " ");

        const parts = rawDateTime.split(/\s+/);
        if (parts.length < 2) return;
        const [datePart, timePart] = parts;

        const dateObj = new Date(`${datePart}T${timePart}`);
        if (isNaN(dateObj) || !isToday(dateObj)) return;

        const title = cells.eq(0).text().trim();
        const trainer = cells.eq(1).text().trim();
        const durMatch = cells.eq(3).text().match(/\d+/);
        const duration = durMatch ? parseInt(durMatch[0], 10) : 60;
        const platform = inferPlatform(cells.eq(6).find("a").attr("href"));

        todayRow.append(
          createCard({ title, trainer, date: dateObj, duration, platform }, idx)
        );
        idx++;
        found = true;
      });

      if (!found) {
        // Show friendly message when there are no sessions today
        todayRow.html(`
          <div class="col-12">
            <div class="alert alert-info text-center" role="alert">
              There are no sessions for today...
            </div>
          </div>
        `);
      }
    }

    // Initial build
    refreshTodayCards();

    // Rebuild cards whenever DataTables re‑draws (pagination, search, add/remove rows, etc.)
    $("#alternative-page-datatable").on("draw.dt", refreshTodayCards);

    /* -------------------------------------------------------------------------- */
    /*  4. Form submission                                                         */
    /* -------------------------------------------------------------------------- */
    $("form.needs-validation").on("submit", function (e) {
      e.preventDefault();
      const form = this;
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const title = $("#sessionTitle").val().trim();
      const trainer = $("#trainerName").val().trim();
      const dateTime = $("#sessionDateTime").val(); // yyyy-mm-ddTHH:MM
      const duration = parseInt($("#duration").val(), 10) || 60;
      const participants = $("#participants").val();
      const link = $("#sessionLink").val().trim();

      const [datePart, timePartFull] = dateTime.split("T");
      const timePart = (timePartFull || "").slice(0, 5); // HH:MM
      const formattedDateTime = `${datePart}\u00A0${timePart}`; // NBSP keeps table spacing consistent
      const statusBadge = '<span class="badge bg-success">Upcoming</span>';

      const newRow = $(
        `<tr>
          <td>${title}</td>
          <td><a href="#" class="trainer-link text-dark" data-name="${trainer}" style="text-decoration:none;">${trainer}</a></td>
          <td>${formattedDateTime}</td>
          <td>${duration}&nbsp;min</td>
          <td>${participants}</td>
          <td>${statusBadge}</td>
          <td><a href="${link}" target="_blank">Join</a></td>
          <td>
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>`
      );

      // Add to DataTable and redraw (draw triggers refreshTodayCards automatically)
      sessionTable.row.add(newRow[0]).draw(false);

      form.reset();
      form.classList.remove("was-validated");

      Swal.fire({
        icon: "success",
        title: "Session added successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    });

    /* -------------------------------------------------------------------------- */
    /*  5. Row deletion (keeps cards in sync)                                      */
    /* -------------------------------------------------------------------------- */
    $(document).on("click", ".btn-danger", function () {
      if ($(this).text().trim() !== "Delete") return;
      const row = $(this).closest("tr");
      sessionTable.row(row).remove().draw(false); // draw triggers refresh
    });
  });
})(jQuery);
