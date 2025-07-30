  
      document.addEventListener("DOMContentLoaded", function () {
        const addMemberForm = document.getElementById("addMemberForm");
        const proceedToPaymentBtn = document.getElementById(
          "proceedToPaymentBtn"
        );
        const addMemberBtn = document.getElementById("addMemberBtn");
        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        const errorModal = new bootstrap.Modal(
          document.getElementById("errorModal")
        );
        const paymentModal = new bootstrap.Modal(
          document.getElementById("paymentModal")
        );
        const photoInput = document.getElementById("photo");
        const paymentOptions = document.querySelectorAll(".payment-option");

        const amountPaidInput = document.getElementById("amount_paid");
        const dueAmountInput = document.getElementById("due_amount");
        const membershipTypeSelect = document.getElementById("membership_type");

        const membershipPrices = {
          "1 month plan": 500,
          "3 month plan": 1300,
          "6 month plan": 2000,
        };

        let isPaymentSuccessful = false;

        // Auto-calculate due amount
        function updateDueAmount() {
          const selectedPlan = membershipTypeSelect.value;
          const paidAmount = parseFloat(amountPaidInput.value) || 0;
          const price = membershipPrices[selectedPlan] || 0;
          const dueAmount = Math.max(price - paidAmount, 0);
          dueAmountInput.value = dueAmount;
        }

        membershipTypeSelect.addEventListener("change", updateDueAmount);
        amountPaidInput.addEventListener("input", updateDueAmount);

        // Photo validation
        photoInput.addEventListener("change", function () {
          if (this.files.length > 0) {
            const file = this.files[0];
            const fileSize = file.size;
            const maxSize = 40 * 1024;
            const allowedTypes = ["image/jpeg", "image/png"];

            let isValid = true;
            if (fileSize > maxSize) {
              this.classList.add("is-invalid");
              this.nextElementSibling.textContent =
                "Photo size exceeds the limit of 40 KB. Please select a smaller photo.";
              isValid = false;
            } else if (!allowedTypes.includes(file.type)) {
              this.classList.add("is-invalid");
              this.nextElementSibling.textContent =
                "Only JPG, JPEG, and PNG image formats are allowed. Please select a valid photo.";
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

        // Proceed to Payment
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

          const contactField = document.getElementById("contact");
          if (contactField.value.length !== 10) {
            contactField.classList.add("is-invalid");
            allFieldsFilled = false;
          } else {
            contactField.classList.remove("is-invalid");
          }

          const pincodeField = document.getElementById("pincode");
          if (pincodeField.value.length !== 6) {
            pincodeField.classList.add("is-invalid");
            allFieldsFilled = false;
          } else {
            pincodeField.classList.remove("is-invalid");
          }

          if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const fileSize = file.size;
            const maxSize = 40 * 1024;
            const allowedTypes = ["image/jpeg", "image/png"];

            if (fileSize > maxSize || !allowedTypes.includes(file.type)) {
              allFieldsFilled = false;
            }
          }

          if (allFieldsFilled) {
            paymentModal.show();
          } else {
            errorModal.show();
          }
        });

        // Handle payment options
        paymentOptions.forEach((button) => {
          button.addEventListener("click", function () {
            const paymentMethod = this.dataset.paymentMethod;
            console.log("Selected payment method:", paymentMethod);

            setTimeout(() => {
              alert("Payment successful with " + paymentMethod + "!");
              isPaymentSuccessful = true;
              paymentModal.hide();
              proceedToPaymentBtn.style.display = "none";
              addMemberBtn.style.display = "inline-block";
            }, 1000);
          });
        });

        // Form submission
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

          const contactField = document.getElementById("contact");
          if (contactField.value.length !== 10) {
            contactField.classList.add("is-invalid");
            allFieldsFilled = false;
          } else {
            contactField.classList.remove("is-invalid");
          }

          const pincodeField = document.getElementById("pincode");
          if (pincodeField.value.length !== 6) {
            pincodeField.classList.add("is-invalid");
            allFieldsFilled = false;
          } else {
            pincodeField.classList.remove("is-invalid");
          }

          // Add paid and due to memberData
          memberData.amount_paid = amountPaidInput.value.trim();
          memberData.due_amount = dueAmountInput.value.trim();

          if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const fileSize = file.size;
            const maxSize = 40 * 1024;
            const allowedTypes = ["image/jpeg", "image/png"];

            if (fileSize > maxSize || !allowedTypes.includes(file.type)) {
              photoInput.classList.add("is-invalid");
              photoInput.nextElementSibling.textContent =
                "Please upload a valid photo (only .jpg, .jpeg, .png formats allowed, max 40 KB).";
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
              members.length > 0
                ? Math.max(...members.map((m) => m.id)) + 1
                : 1;

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

        // Number-only restrictions
        document
          .getElementById("contact")
          .addEventListener("keypress", function (e) {
            const charCode = e.which || e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              e.preventDefault();
            }
          });

        document
          .getElementById("pincode")
          .addEventListener("keypress", function (e) {
            const charCode = e.which || e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              e.preventDefault();
            }
          });
      });
  
      const membershipDurations = {
        "1 month plan": 1,
        "3 month plan": 3,
        "6 month plan": 6,
      };

      function calculateExpiryDate() {
        const type = document.getElementById("membership_type").value;
        const joiningDate = document.getElementById("joining_date").value;
        const expiryField = document.getElementById("expiry_date");

        if (type && joiningDate) {
          const months = membershipDurations[type];
          const joinDateObj = new Date(joiningDate);
          joinDateObj.setMonth(joinDateObj.getMonth() + months);
          const expiryISO = joinDateObj.toISOString().split("T")[0];
          expiryField.value = expiryISO;
        } else {
          expiryField.value = "";
        }
      }

      document
        .getElementById("membership_type")
        .addEventListener("change", calculateExpiryDate);
      document
        .getElementById("joining_date")
        .addEventListener("change", calculateExpiryDate);
  
