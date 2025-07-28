
  let data = [
    ["Rahul Thakur", "Trainer", "Nagpur", "2025/05/14", "2025/06/15", "Morning"],
    ["Chetan Parate", "Manager", "Nagpur", "2025/05/13", "2025/08/10", "Evening"],
    ["Shyam Sharma", "Receptionist", "Nagpur", "2025/05/12", "2025/06/11", "Afternoon"],
    ["Priya Sharma", "Trainer", "Nagpur", "2025/05/12", "2025/07/25", "Morning"],
    ["Akash Tiwari", "Member", "Nagpur", "2025/06/01", "2025/09/01", "Evening"],
    ["Neha Verma", "Member", "Nagpur", "2025/06/05", "2025/08/20", "Morning"]
  ];

  function renderSharedTable() {
    const staffTable = document.getElementById("sharedTableBody");
    const memberTable = document.getElementById("sharedTableBodyClone");
    staffTable.innerHTML = "";
    memberTable.innerHTML = "";

    data.forEach((row, index) => {
      const role = row[1].toLowerCase();
      const email = `${row[0].toLowerCase().replace(/ /g, "")}@gmail.com`;

      // If role is staff
      if (["trainer", "manager", "receptionist"].includes(role)) {
        const staffRow = document.createElement("tr");
        staffRow.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td>${row[5]}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteMember(${index})">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        `;
        staffTable.appendChild(staffRow);
      }

      // If role is member
      if (role === "member") {
        const memberRow = document.createElement("tr");
        memberRow.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
          <td>${email}</td>
          <td>
            <button class="btn btn-success btn-sm" onclick="renewPlan('${row[0]}')">
              <i class="fas fa-sync-alt"></i> Renew
            </button>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteMember(${index})">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        `;
        memberTable.appendChild(memberRow);
      }
    });
  }

  // Call initially
  renderSharedTable();

  // Delete Member Function
  function deleteMember(index) {
    if (confirm("Are you sure you want to delete this entry?")) {
      data.splice(index, 1);
      renderSharedTable();
    }
  }

  // Renew Plan Function - Redirect to edit-member.html
  function renewPlan(name) {
    window.location.href = "edit-member.html";
  }

  // Toggle Forms
  function showForm(type) {
    document.getElementById("staffForm").classList.add("d-none");
    document.getElementById("memberForm").classList.add("d-none");

    if (type === "staff") {
      document.getElementById("staffForm").classList.remove("d-none");
    } else if (type === "member") {
      document.getElementById("memberForm").classList.remove("d-none");
    }
  }

