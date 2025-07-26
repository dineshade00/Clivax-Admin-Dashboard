let dietPlans = JSON.parse(localStorage.getItem("dietPlans")) || [];

      document.getElementById("dietForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const plan = {
          goal: document.getElementById("goal").value,
          startDate: document.getElementById("startDate").value,
          endDate: document.getElementById("endDate").value,
          breakfast: document.getElementById("breakfast").value,
          lunch: document.getElementById("lunch").value,
          dinner: document.getElementById("dinner").value,
          snacks: document.getElementById("snacks").value,
          water: document.getElementById("water").value,
        };

        const editIndex = document.getElementById("editIndex").value;

        if (editIndex === "") {
          dietPlans.push(plan);
        } else {
          dietPlans[editIndex] = plan;
          document.getElementById("editIndex").value = "";
        }

        localStorage.setItem("dietPlans", JSON.stringify(dietPlans));
        renderTable();
        hideForm();
        this.reset();
      });

      function renderTable() {
        const tbody = document.getElementById("dietTbody");
        tbody.innerHTML = "";

        dietPlans.forEach((plan, index) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${plan.goal}</td>
            <td>${plan.breakfast}</td>
            <td>${plan.lunch}</td>
            <td>${plan.dinner}</td>
            <td>${plan.snacks}</td>
            <td>${plan.water}</td>
            <td>${formatDate(plan.startDate)} - ${formatDate(plan.endDate)}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editPlan(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deletePlan(${index})">Delete</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }

      function formatDate(date) {
        const d = new Date(date);
        return d.getDate().toString().padStart(2, "0") + "-" + d.toLocaleString("default", { month: "short" });
      }

      function showForm() {
        document.getElementById("dietFormCard").classList.remove("d-none");
        document.getElementById("dietTableCard").classList.add("d-none");
        document.getElementById("addBtnSection").classList.add("d-none");
        document.getElementById("formTitle").textContent = "Add New Diet Plan";
      }

      function hideForm() {
        document.getElementById("dietFormCard").classList.add("d-none");
        document.getElementById("dietTableCard").classList.remove("d-none");
        document.getElementById("addBtnSection").classList.remove("d-none");
        document.getElementById("dietForm").reset();
        document.getElementById("editIndex").value = "";
      }

      function editPlan(index) {
        const plan = dietPlans[index];
        document.getElementById("goal").value = plan.goal;
        document.getElementById("startDate").value = plan.startDate;
        document.getElementById("endDate").value = plan.endDate;
        document.getElementById("breakfast").value = plan.breakfast;
        document.getElementById("lunch").value = plan.lunch;
        document.getElementById("dinner").value = plan.dinner;
        document.getElementById("snacks").value = plan.snacks;
        document.getElementById("water").value = plan.water;
        document.getElementById("editIndex").value = index;
        showForm();
        document.getElementById("formTitle").textContent = "Edit Diet Plan";
      }

      function deletePlan(index) {
        if (confirm("Are you sure you want to delete this plan?")) {
          dietPlans.splice(index, 1);
          localStorage.setItem("dietPlans", JSON.stringify(dietPlans));
          renderTable();
        }
      }

      renderTable();
