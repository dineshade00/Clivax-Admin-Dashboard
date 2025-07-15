
const staffNames = [
  "John Smith",
  "Jane Doe",
  "David Lee",
  "Emily Davis",
  "Chris Johnson",
  "Lisa Wong",
  "Michael Brown",
  "Sarah Taylor",
  "Daniel Wilson",
  "Olivia Martin",
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
  const tbody = document.getElementById(`${type}TableBody`);
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
    <div class="d-flex flex-wrap gap-1">
      ${daysArray
        .map((status, i) => {
          const color = status === true ? "green" : status === false ? "red" : "gray";
          const checked = status !== null ? "checked" : "";
          return `
            <label style="display:inline-flex; align-items:center; gap:4px;">
              <input type="checkbox" class="calendar-checkbox ${color}" disabled ${checked} />
              ${i + 1}
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}
