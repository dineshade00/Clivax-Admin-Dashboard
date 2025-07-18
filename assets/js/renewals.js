let data = [
  ["Rahul Thakur", "Trainer", "Mumbai", "29", "2021/06/15", "Morning"],
  ["Chetan Parate", "Manager", "Pune", "32", "2022/04/10", "Evening"],
  ["Shyam Sharma", "Receptionist", "Delhi", "35", "2020/08/01", "Afternoon"],
  ["Priya Sharma", "Trainer", "Mumbai", "30", "2023/01/25", "Morning"],
  ["Amit Verma", "Sweeper", "Nashik", "28", "2019/11/20", "Evening"],
];

function renderSharedTable() {
  const staffTable = document.getElementById("sharedTableBody");
  const memberTable = document.getElementById("sharedTableBodyClone");
  staffTable.innerHTML = "";
  memberTable.innerHTML = "";

  data.forEach((row) => {
    // Staff Row
    const staffRow = document.createElement("tr");
    staffRow.innerHTML = `
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
      `;
    staffTable.appendChild(staffRow);

    // Member Row
    const memberRow = document.createElement("tr");
    memberRow.innerHTML = `
        <td>${row[0]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>1990-01-01</td>
        <td>${row[0].toLowerCase().replace(" ", "")}@gmail.com</td>
      `;
    memberTable.appendChild(memberRow);
  });
}

renderSharedTable();

function showForm(type) {
  // Hide both forms initially
  document.getElementById("staffForm").classList.add("d-none");
  document.getElementById("memberForm").classList.add("d-none");

  // Show the selected form
  if (type === "staff") {
    document.getElementById("staffForm").classList.remove("d-none");
  } else if (type === "member") {
    document.getElementById("memberForm").classList.remove("d-none");
  }
}

