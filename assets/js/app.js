 document.addEventListener("DOMContentLoaded", () => {
            const allDetails = document.querySelectorAll("table details");

            allDetails.forEach((detail) => {
                const summary = detail.querySelector("summary");

                summary.addEventListener("click", (e) => {
                    e.preventDefault();

                    const isOpen = detail.hasAttribute("open");

                    // Close all other details
                    allDetails.forEach((otherDetail) => {
                        if (otherDetail !== detail) {
                            otherDetail.removeAttribute("open");
                            otherDetail.querySelector("summary").textContent = "Show";
                        }
                    });

                    // Toggle current detail
                    if (isOpen) {
                        detail.removeAttribute("open");
                        summary.textContent = "Show";
                    } else {
                        detail.setAttribute("open", "");
                        summary.textContent = "Hide";
                    }
                });
            });
        });
