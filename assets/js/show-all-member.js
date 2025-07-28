  
      $(document).ready(function () {
        var table = $("#datatable-col-visiblility").DataTable();

        // Function to load members from localStorage and populate the table
        function loadMembers() {
          let members = JSON.parse(localStorage.getItem("members")) || [];
          // Reassign IDs to ensure they are sequential after deletions/additions
          members = members.map((member, index) => ({
            ...member,
            id: index + 1,
          }));
          localStorage.setItem("members", JSON.stringify(members)); // Save re-sequenced IDs

          table.clear(); // Clear existing table data

          members.forEach((member) => {
            const photoSrc =
              member.photoUrl ||
              "https://via.placeholder.com/40/CCCCCC/888888?text=No+Photo"; // Placeholder if no photo
            const statusBadgeClass =
              member.status === "Active" ? "bg-success" : "bg-danger";
            table.row.add([
              member.id,
              `<img src="${photoSrc}" alt="Photo" width="40" height="40" style="object-fit: cover; border-radius: 50%;" />`,
              member.firstName,
              member.lastName,
              member.contact,
              member.emailAddress,
              member.membership_type,
              `<span class="badge ${statusBadgeClass}">${member.status}</span>`,
              `
                    <a class="btn btn-sm btn-info view-card-btn" data-member-id="${member.id}" title="View Profile">
                        <i class="fas fa-id-card"></i>
                    </a>
                    <a href="edit-member.html?id=${member.id}" class="btn btn-sm btn-primary" title="Edit Member">
                        <i class="fas fa-pen"></i>
                    </a>
                    <a class="btn btn-sm btn-danger delete-member-btn" data-member-id="${member.id}" title="Delete Member">
                        <i class="fas fa-trash"></i>
                    </a>
                `,
            ]);
          });
          table.draw(false); // Draw the table with the new data
        }

        // Call loadMembers on page load to populate the table from localStorage
        loadMembers();

        // Handle click on "view card" icon to show member profile
        $("#datatable-col-visiblility tbody").on(
          "click",
          ".view-card-btn",
          function () {
            var id = $(this).data("member-id");
            const members = JSON.parse(localStorage.getItem("members")) || [];
            const member = members.find((m) => m.id == id);

            if (member) {
              // Populate the Member Profile section
              $("#profileMemberId").text(
                "#CA-" + String(member.id).padStart(5, "0")
              );
              $("#profileFullName").text(
                member.firstName + " " + member.lastName
              );
              $("#profileDOB").text(member.dob || "N/A");
              $("#profileGender").text(member.gender || "N/A");
              $("#profileContact").text(member.contact || "N/A");
              $("#profileEmail").text(member.emailAddress || "N/A");
              $("#profileAddress").text(
                (member.address || "") + (member.city ? ", " + member.city : "")
              );
              $("#profilePincode").text(member.pincode || "N/A");
              $("#profileMembershipType").text(member.membership_type || "N/A");
              $("#profileStatus").text(member.status || "N/A");
              $("#profilePhoto").attr(
                "src",
                member.photoUrl ||
                  "https://via.placeholder.com/150/CCCCCC/888888?text=No+Photo"
              );

              // Show the Member Profile section and hide the Total Member table
              $("#memberProfileSection").show();
              $(".row:has(#datatable-col-visiblility)").hide(); // Hide the table container

              // Optionally, scroll to the profile section
              $("html, body").animate(
                {
                  scrollTop: $("#memberProfileSection").offset().top,
                },
                500
              );
            }
          }
        );

        // Handle click on "Membership Card" button within the profile section
        $("#profileMembershipCardBtn").on("click", function () {
          const memberIdString = $("#profileMemberId")
            .text()
            .replace("#CA-", "");
          const memberId = parseInt(memberIdString);

          const members = JSON.parse(localStorage.getItem("members")) || [];
          const member = members.find((m) => m.id === memberId);

          if (member) {
            $("#cardMemberId").text(
              "#CA-" + String(member.id).padStart(5, "0")
            );
            $("#cardName").text(member.firstName + " " + member.lastName);
            $("#cardAddress").text(
              member.address +
                ", " +
                member.city +
                (member.pincode ? ", " + member.pincode : "")
            );
            $("#cardType").text(member.membership_type);
            $("#cardPhoto").attr(
              "src",
              member.photoUrl ||
                "https://via.placeholder.com/100/CCCCCC/888888?text=No+Photo"
            );

            let validTillDate = new Date(); // Start with current date for validity calculation
            if (member.membership_start_date) {
              // Assume you might store this
              validTillDate = new Date(member.membership_start_date);
            } else if (member.dob) {
              // Fallback, though not ideal for membership validity
              validTillDate = new Date(member.dob);
            }

            if (
              member.membership_type &&
              member.membership_type.includes("1 month")
            ) {
              validTillDate.setMonth(validTillDate.getMonth() + 1);
            } else if (
              member.membership_type &&
              member.membership_type.includes("3 month")
            ) {
              validTillDate.setMonth(validTillDate.getMonth() + 3);
            } else if (
              member.membership_type &&
              member.membership_type.includes("6 month")
            ) {
              validTillDate.setMonth(validTillDate.getMonth() + 6);
            }
            // If membership_type is not recognized or missing, validTillDate will be current/dob + 0 months
            $("#cardValidTill").text(
              validTillDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            );

            var myCardModal = new bootstrap.Modal(
              document.getElementById("membershipCardModal")
            );
            myCardModal.show();
          }
        });

        // Handle delete member button click
        $("#datatable-col-visiblility tbody").on(
          "click",
          ".delete-member-btn",
          function () {
            var $row = $(this).closest("tr");
            if ($row.hasClass("child")) {
              $row = $row.prev(); // Get the parent row if clicked on child row (responsive mode)
            }

            var memberIdToDelete = $(this).data("member-id");
            // Extracting name from the table cell directly
            var firstName = $row.find("td:eq(2)").text();
            var lastName = $row.find("td:eq(3)").text();
            var memberName = firstName + " " + lastName;

            if (
              confirm("Are you sure you want to delete " + memberName + "?")
            ) {
              let members = JSON.parse(localStorage.getItem("members")) || [];
              members = members.filter(
                (member) => member.id !== memberIdToDelete
              );

              // Re-sequence IDs after deletion
              members = members.map((member, index) => ({
                ...member,
                id: index + 1,
              }));

              localStorage.setItem("members", JSON.stringify(members));

              loadMembers(); // Reload table data
              alert(memberName + " has been deleted successfully!");
            } else {
              alert("Deletion cancelled.");
            }
          }
        );
      });
    
