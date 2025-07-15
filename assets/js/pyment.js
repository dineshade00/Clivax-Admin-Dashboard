// <!-- JS to control tab switching and dummy data -->

function showHistory(tabId) {
    // Hide both
    document.getElementById('staffHistory').style.display = 'none';
    document.getElementById('memberHistory').style.display = 'none';

    // Show selected
    document.getElementById(tabId).style.display = 'block';

    // Update active class
    const buttons = document.querySelectorAll('#historyTabs .nav-link');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (tabId === 'staffHistory') {
        buttons[0].classList.add('active');
    } else {
        buttons[1].classList.add('active');
    }
}

// Dummy data for Staff Salary
const staffData = [
    { name: "Ravi Sharma", id: "S101", role: "Trainer", acc: "1234567890", bank: "SBI", amount: "25000", date: "2025-07-01", mode: "Bank Transfer" },
    { name: "Meena Gupta", id: "S102", role: "Receptionist", acc: "9876543210", bank: "HDFC", amount: "18000", date: "2025-07-03", mode: "Cash" },
    { name: "Amit Kumar", id: "S103", role: "Cleaner", acc: "1111222233", bank: "ICICI", amount: "12000", date: "2025-07-05", mode: "UPI" },
    { name: "Sonal Mehta", id: "S104", role: "Admin", acc: "4444555566", bank: "AXIS", amount: "30000", date: "2025-07-06", mode: "Cheque" },
    { name: "Deepak Jain", id: "S105", role: "Trainer", acc: "9999888877", bank: "SBI", amount: "26000", date: "2025-07-07", mode: "Bank Transfer" },
    { name: "Nisha Patel", id: "S106", role: "Receptionist", acc: "6666777788", bank: "HDFC", amount: "19000", date: "2025-07-08", mode: "UPI" },
    { name: "Rahul Verma", id: "S107", role: "Cleaner", acc: "2222333344", bank: "ICICI", amount: "13000", date: "2025-07-09", mode: "Cash" },
    { name: "Priya Singh", id: "S108", role: "Admin", acc: "5555666677", bank: "AXIS", amount: "32000", date: "2025-07-10", mode: "Bank Transfer" },
    { name: "Karan Desai", id: "S109", role: "Trainer", acc: "8888999900", bank: "SBI", amount: "27000", date: "2025-07-11", mode: "Cheque" },
    { name: "Alka Joshi", id: "S110", role: "Receptionist", acc: "3333444455", bank: "HDFC", amount: "18500", date: "2025-07-12", mode: "UPI" }
];


// Dummy data for Member Payment
const memberData = [
    { name: "Aman Verma", id: "M201", type: "Monthly", amount: "1500", date: "2025-07-01" },
    { name: "Pooja Yadav", id: "M202", type: "Quarterly", amount: "4000", date: "2025-07-05" },
    { name: "Vikram Singh", id: "M203", type: "Yearly", amount: "15000", date: "2025-07-02" },
    { name: "Sneha Roy", id: "M204", type: "Monthly", amount: "1500", date: "2025-07-06" },
    { name: "Arjun Mehta", id: "M205", type: "Quarterly", amount: "4200", date: "2025-07-07" },
    { name: "Nikita Sharma", id: "M206", type: "Monthly", amount: "1600", date: "2025-07-08" },
    { name: "Rohan Desai", id: "M207", type: "Yearly", amount: "15500", date: "2025-07-09" },
    { name: "Kavita Sinha", id: "M208", type: "Monthly", amount: "1500", date: "2025-07-10" },
    { name: "Suraj Patil", id: "M209", type: "Quarterly", amount: "4100", date: "2025-07-11" },
    { name: "Divya Pandey", id: "M210", type: "Yearly", amount: "16000", date: "2025-07-12" }
];


// Load dummy data into tables
function loadHistoryData() {
    const staffBody = document.getElementById('staffHistoryBody');
    staffData.forEach(item => {
        const row = `<tr>
                <td>${item.name}</td>
                <td>${item.id}</td>
                <td>${item.role}</td>
                <td>${item.acc}</td>
                <td>${item.bank}</td>
                <td>₹${item.amount}</td>
                <td>${item.date}</td>
                <td>${item.mode}</td>
            </tr>`;
        staffBody.innerHTML += row;
    });

    const memberBody = document.getElementById('memberHistoryBody');
    memberData.forEach(item => {
        const row = `<tr>
                <td>${item.name}</td>
                <td>${item.id}</td>
                <td>${item.type}</td>
                <td>₹${item.amount}</td>
                <td>${item.date}</td>
            </tr>`;
        memberBody.innerHTML += row;
    });
}

// On page load
document.addEventListener('DOMContentLoaded', loadHistoryData);



// print payment history by printer

function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    const originalContent = document.body.innerHTML;
    const sectionContent = section.innerHTML;

    // Open a new window for printing
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print History</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <style>
                body { padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                h4 { text-align: center; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            ${sectionContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}
