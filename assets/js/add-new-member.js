document.addEventListener("DOMContentLoaded", function () {
  const addMemberForm = document.getElementById("addMemberForm");
  const proceedToPaymentBtn = document.getElementById("proceedToPaymentBtn");
  const addMemberBtn = document.getElementById("addMemberBtn");
  const successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  const paymentModal = new bootstrap.Modal(
    document.getElementById("paymentModal")
  );
  const photoInput = document.getElementById("photo");
  const paymentOptions = document.querySelectorAll(".payment-option");

  const amountPaidInput = document.getElementById("amount_paid");
  const dueAmountInput = document.getElementById("due_amount");
  const membershipTypeSelect = document.getElementById("membership_type");
  const joiningDateInput = document.getElementById("joining_date");
  const expiryDateInput = document.getElementById("expiry_date");

  const membershipPrices = {
    "1 month plan": 500,
    "3 month plan": 1300,
    "6 month plan": 2000,
  };

  function updateDueAmount() {
    const selectedPlan = membershipTypeSelect.value;
    const paidAmount = parseFloat(amountPaidInput.value) || 0;
    const price = membershipPrices[selectedPlan] || 0;
    const dueAmount = Math.max(price - paidAmount, 0);
    dueAmountInput.value = dueAmount;
  }

  function calculateExpiryDate() {
    const joiningDate = joiningDateInput.value;
    const membership = membershipTypeSelect.value;

    if (!joiningDate || !membership) {
      expiryDateInput.value = "";
      return;
    }

    const date = new Date(joiningDate);
    if (membership.includes("1 month")) {
      date.setMonth(date.getMonth() + 1);
    } else if (membership.includes("3 month")) {
      date.setMonth(date.getMonth() + 3);
    } else if (membership.includes("6 month")) {
      date.setMonth(date.getMonth() + 6);
    }
    expiryDateInput.value = date.toISOString().split("T")[0];
  }

  membershipTypeSelect.addEventListener("change", () => {
    updateDueAmount();
    calculateExpiryDate();
  });

  amountPaidInput.addEventListener("input", updateDueAmount);
  joiningDateInput.addEventListener("change", calculateExpiryDate);

  photoInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      const file = this.files[0];
      const fileSize = file.size;
      const maxSize = 40 * 1024;
      const allowedTypes = ["image/jpeg", "image/png"];

      let isValid = true;
      if (fileSize > maxSize) {
        this.classList.add("is-invalid");
        this.nextElementSibling.textContent = "Photo size exceeds 40 KB.";
        isValid = false;
      } else if (!allowedTypes.includes(file.type)) {
        this.classList.add("is-invalid");
        this.nextElementSibling.textContent = "Only JPG or PNG allowed.";
        isValid = false;
      } else {
        this.classList.remove("is-invalid");
      }

      if (!isValid) {
        this.value = "";
      }
    } else {
      this.classList.remove("is-invalid");
    }
  });

  proceedToPaymentBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let allFieldsFilled = true;
    const requiredFields = addMemberForm.querySelectorAll(
      "[required]:not(#photo)"
    );

    requiredFields.forEach((field) => {
      if (
        field.value.trim() === "" ||
        (field.tagName === "SELECT" && field.value === "")
      ) {
        field.classList.add("is-invalid");
        allFieldsFilled = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    if (photoInput.files.length > 0) {
      const file = photoInput.files[0];
      const fileSize = file.size;
      const maxSize = 40 * 1024;
      const allowedTypes = ["image/jpeg", "image/png"];
      if (fileSize > maxSize || !allowedTypes.includes(file.type)) {
        allFieldsFilled = false;
      }
    }

    const contactField = document.getElementById("contact");
    if (contactField.value.length !== 10) {
      contactField.classList.add("is-invalid");
      allFieldsFilled = false;
    }

    const pincodeField = document.getElementById("pincode");
    if (pincodeField.value.length !== 6) {
      pincodeField.classList.add("is-invalid");
      allFieldsFilled = false;
    }

    if (allFieldsFilled) {
      paymentModal.show();
    } else {
      errorModal.show();
    }
  });

  paymentOptions.forEach((button) => {
    button.addEventListener("click", function () {
      const paymentMethod = this.dataset.paymentMethod;
      setTimeout(() => {
        alert("Payment successful with " + paymentMethod + "!");
        isPaymentSuccessful = true;
        paymentModal.hide();
        proceedToPaymentBtn.style.display = "none";
        addMemberBtn.style.display = "inline-block";
      }, 1000);
    });
  });

  addMemberForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!isPaymentSuccessful) {
      errorModal.show();
      return;
    }

    let allFieldsFilled = true;
    const memberData = {};
    const requiredFields = addMemberForm.querySelectorAll(
      "[required]:not(#photo)"
    );

    requiredFields.forEach((field) => {
      if (
        field.value.trim() === "" ||
        (field.tagName === "SELECT" && field.value === "")
      ) {
        field.classList.add("is-invalid");
        allFieldsFilled = false;
      } else {
        field.classList.remove("is-invalid");
      }
      if (field.id) {
        memberData[field.id] = field.value.trim();
      }
    });

    memberData.amount_paid = amountPaidInput.value.trim();
    memberData.due_amount = dueAmountInput.value.trim();
    memberData.joining_date = joiningDateInput.value.trim();
    memberData.expiry_date = expiryDateInput.value.trim();

    if (photoInput.files.length > 0) {
      const file = photoInput.files[0];
      const fileSize = file.size;
      const maxSize = 40 * 1024;
      const allowedTypes = ["image/jpeg", "image/png"];

      if (fileSize > maxSize || !allowedTypes.includes(file.type)) {
        photoInput.classList.add("is-invalid");
        allFieldsFilled = false;
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          memberData.photoUrl = e.target.result;
          finalizeMemberAddition(memberData, allFieldsFilled);
        };
        reader.readAsDataURL(file);
      }
    } else {
      memberData.photoUrl =
        "https://via.placeholder.com/150/CCCCCC/888888?text=No+Photo";
      finalizeMemberAddition(memberData, allFieldsFilled);
    }
  });

  function finalizeMemberAddition(memberData, allFieldsFilled) {
    if (allFieldsFilled) {
      const members = JSON.parse(localStorage.getItem("members")) || [];
      const newId =
        members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;

      const newMember = {
        id: newId,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        contact: memberData.contact,
        emailAddress: memberData.emailAddress,
        gender: memberData.gender,
        dob: memberData.dob,
        address: memberData.address,
        city: memberData.city,
        pincode: memberData.pincode,
        photoUrl: memberData.photoUrl,
        membership_type: memberData.membership_type,
        amount_paid: memberData.amount_paid,
        due_amount: memberData.due_amount,
        joining_date: memberData.joining_date, // ✅ Added
        expiry_date: memberData.expiry_date, // ✅ Added
        status: "Active",
      };

      members.push(newMember);
      localStorage.setItem("members", JSON.stringify(members));

      if ($.fn.DataTable.isDataTable("#datatable-col-visiblility")) {
        const table = $("#datatable-col-visiblility").DataTable();
        const statusBadgeClass =
          newMember.status === "Active" ? "bg-success" : "bg-danger";

        table.row
          .add([
            newMember.id,
            `<img src="${newMember.photoUrl}" alt="Photo" width="40" height="40" class="rounded-circle"/>`,
            newMember.firstName,
            newMember.lastName,
            newMember.gender,
            newMember.dob,
            newMember.contact,
            newMember.emailAddress,
            newMember.address,
            newMember.city,
            newMember.pincode,
            newMember.membership_type,
            `<span class="badge ${statusBadgeClass}">${newMember.status}</span>`,
            `
            <a href="edit-member.html?id=${newMember.id}" class="btn btn-sm btn-primary">
              <i class="fas fa-pen"></i>
            </a>
            <a class="btn btn-sm btn-danger delete-member-btn" data-id="${newMember.id}">
              <i class="fas fa-trash"></i>
            </a>
          `,
          ])
          .draw(false);
      }

      successModal.show();
      addMemberForm.reset();
      isPaymentSuccessful = false;
      proceedToPaymentBtn.style.display = "inline-block";
      addMemberBtn.style.display = "none";
      dueAmountInput.value = "";
    } else {
      errorModal.show();
    }
  }
});
