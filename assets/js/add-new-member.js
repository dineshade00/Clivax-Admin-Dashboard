
  document.addEventListener("DOMContentLoaded", function () {
    const addMemberForm = document.getElementById("addMemberForm");
    const proceedToPaymentBtn = document.getElementById("proceedToPaymentBtn");
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

    let isPaymentSuccessful = false; // Flag to track payment status

    // Add invalid-feedback for photo input in HTML and use it here
    photoInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        const file = this.files[0];
        const fileSize = file.size; // Size in bytes
        const maxSize = 40 * 1024; // 40 KB in bytes
        const allowedTypes = ["image/jpeg", "image/png"]; // Allowed MIME types

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
          this.value = ""; // Clear the file input if invalid
        }
      } else {
        this.classList.remove("is-invalid"); // Remove validation state if no file
      }
    });

    // Event listener for "Proceed to Payment" button
    proceedToPaymentBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default button action

      let allFieldsFilled = true;
      const requiredFields = addMemberForm.querySelectorAll(
        "[required]:not(#photo)"
      ); // Photo is optional

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

      // Validate contact number (10 digits)
      const contactField = document.getElementById("contact");
      if (contactField.value.length !== 10) {
        contactField.classList.add("is-invalid");
        allFieldsFilled = false;
      } else {
        contactField.classList.remove("is-invalid");
      }

      // Validate pincode (6 digits)
      const pincodeField = document.getElementById("pincode");
      if (pincodeField.value.length !== 6) {
        pincodeField.classList.add("is-invalid");
        allFieldsFilled = false;
      } else {
        pincodeField.classList.remove("is-invalid");
      }

      // Re-check photo file size and type validation before opening payment modal
      if (photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const fileSize = file.size;
        const maxSize = 40 * 1024;
        const allowedTypes = ["image/jpeg", "image/png"];

        if (fileSize > maxSize || !allowedTypes.includes(file.type)) {
          // The photoInput event listener should handle adding 'is-invalid' and message
          allFieldsFilled = false; // Mark as not filled if photo validation fails
        }
      }

      if (allFieldsFilled) {
        paymentModal.show(); // Show the payment options modal
      } else {
        errorModal.show(); // Show error if form fields are not filled
      }
    });

    // Event listeners for payment options
    paymentOptions.forEach((button) => {
      button.addEventListener("click", function () {
        const paymentMethod = this.dataset.paymentMethod;
        console.log("Selected payment method:", paymentMethod);

        // Simulate payment processing
        setTimeout(() => {
          alert("Payment successful with " + paymentMethod + "!");
          isPaymentSuccessful = true;
          paymentModal.hide(); // Hide payment modal
          proceedToPaymentBtn.style.display = "none"; // Hide payment button
          addMemberBtn.style.display = "inline-block"; // Show "Add New Member" button
        }, 1000); // Simulate a 1-second delay for payment processing
      });
    });

    // Original form submission for "Add New Member"
    addMemberForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      if (!isPaymentSuccessful) {
        // This condition should ideally not be met if the button is hidden,
        // but as a safeguard.
        errorModal.show();
        return;
      }

      let allFieldsFilled = true;
      const memberData = {}; // Object to store form data

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

      // Manual validation for contact and pincode here as well for direct submission
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

      // Handle photo data: Read as Data URL for storage and display
      if (photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const fileSize = file.size;
        const maxSize = 40 * 1024;
        const allowedTypes = ["image/jpeg", "image/png"];

        if (fileSize > maxSize || !allowedTypes.includes(file.type)) {
          // This case should ideally be caught by the photoInput change listener
          // and proceedToPaymentBtn validation, but adding a final check.
          photoInput.classList.add("is-invalid");
          photoInput.nextElementSibling.textContent =
            "Please upload a valid photo (only .jpg, .jpeg, .png formats allowed, max 40 KB).";
          allFieldsFilled = false;
        } else {
          const reader = new FileReader();
          reader.onload = function (e) {
            memberData.photoUrl = e.target.result; // Store base64 string
            finalizeMemberAddition(memberData, allFieldsFilled);
          };
          reader.readAsDataURL(file); // Read file as Data URL
        }
      } else {
        // If no photo is selected, use a placeholder
        memberData.photoUrl =
          "https://via.placeholder.com/150/CCCCCC/888888?text=No+Photo";
        finalizeMemberAddition(memberData, allFieldsFilled);
      }
    });

    function finalizeMemberAddition(memberData, allFieldsFilled) {
      if (allFieldsFilled) {
        const members = JSON.parse(localStorage.getItem("members")) || [];
        const newId = members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;

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
          photoUrl: memberData.photoUrl, // This will now be the base64 string or placeholder
          membership_type: memberData.membership_type,
          status: "Active",
        };

        members.push(newMember);
        localStorage.setItem("members", JSON.stringify(members));

        // Check if DataTable is initialized before trying to add a row
        if ($.fn.DataTable.isDataTable("#datatable-col-visiblility")) {
          const table = $("#datatable-col-visiblility").DataTable();
          const statusBadgeClass =
            newMember.status === "Active" ? "bg-success" : "bg-danger";

          table.row
            .add([
              newMember.id,
              `<img src="${newMember.photoUrl}" alt="Photo" width="40" height="40" class="rounded-circle"/>`, // Display image directly
              newMember.firstName,
              newMember.lastName,
              newMember.gender,
              newMember.dob,
              // Removed maritalStatus and occupation as they are not in the form
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
        } else {
          console.warn(
            "DataTable '#datatable-col-visiblility' not initialized. Member data saved to localStorage but not added to table display."
          );
        }

        successModal.show();
        addMemberForm.reset();
        isPaymentSuccessful = false; // Reset payment status for next member
        proceedToPaymentBtn.style.display = "inline-block"; // Show payment button again
        addMemberBtn.style.display = "none"; // Hide "Add New Member" button
      } else {
        errorModal.show();
      }
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const contactInput = document.getElementById("contact");
    const pincodeInput = document.getElementById("pincode");

    // Allow only numbers for contact
    contactInput.addEventListener("keypress", function (event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    });

    // Allow only numbers for pincode
    pincodeInput.addEventListener("keypress", function (event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    });
  });


