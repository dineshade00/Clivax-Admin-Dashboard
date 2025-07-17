const staffNames = [
  "Shubham Khodke",
  "pawan satpute",
  "Aniket Wagh",
  "Emily Rathi",
  "Shivam Patil",
  "Om Nandgirwar",
  "Mithilesh Pathak",
  "Arjun thakre",
  "Shreyash Gawande",
  "Manish Bhagat",
];
const staffData = {};
const memberData = {};

window.onload = () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("staffDate").value = today;
  document.getElementById("memberDate").value = today;
  initializeTables();
};

function initializeTables() {
  staffNames.forEach((name) => {
    staffData[name] = Array(30).fill(null);
    memberData[name] = Array(30).fill(null);
  });
  renderAttendanceTable("staff");
  renderAttendanceTable("member");
}

function getDateDay(dateStr) {
  return new Date(dateStr).getDate();
}

function submitAttendance(type, isPresent) {
  const name = document.getElementById(`${type}FullName`).value;
  const date = document.getElementById(`${type}Date`).value;
  if (!name || !date) return;

  const dataSet = type === "staff" ? staffData : memberData;
  const dayIndex = getDateDay(date) - 1;

  if (isPresent) {
    for (let i = 0; i <= dayIndex; i++) {
      dataSet[name][i] = true;
    }
  } else {
    for (let i = 0; i < dayIndex; i++) {
      if (dataSet[name][i] === null) dataSet[name][i] = true;
    }
    dataSet[name][dayIndex] = false;
  }

  renderAttendanceTable(type);
  document.getElementById(`${type}FullName`).value = "";
}

function renderAttendanceTable(type) {
  const dataSet = type === "staff" ? staffData : memberData;
  const tbody = document.getElementById(type + "TableBody");
  tbody.innerHTML = "";

  Object.entries(dataSet).forEach(([fullName, daysArray]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${fullName}</td>
          <td>${generateDayGrid(daysArray)}</td>
        `;
    tbody.appendChild(row);
  });
}

function generateDayGrid(daysArray) {
  return `
        <div class="day-grid">
          ${daysArray
            .map((status, i) => {
              if (status === true) {
                return `<label><input type="checkbox" class="calendar-checkbox green" disabled checked /> ${
                  i + 1
                }</label>`;
              } else if (status === false) {
                return `<label><input type="checkbox" class="calendar-checkbox red" disabled checked /> ${
                  i + 1
                }</label>`;
              }
              return `<label><input type="checkbox" class="calendar-checkbox" disabled /> ${
                i + 1
              }</label>`;
            })
            .join("")}
        </div>
      `;
}
