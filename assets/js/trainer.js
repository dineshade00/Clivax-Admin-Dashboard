function viewProfile(id) {
  let trainers = {
    1: {
      name: "Rahul Singh",
      role: "Strength Trainer",
      status: "Active",
      image: "assets/images/trainer1.jpg",
      clientLoad: "35",
      sessionUtilization: "90%",
      clientRetention: "95%",
      monthlyRevenue: "$5,000",
      about:
        "Rahul is an experienced strength trainer specialized in weightlifting and endurance training.",
      specializations: ["Strength Training", "Weightlifting"],
      schedule: [
        {
          time: "8 AM",
          session: "Strength Training",
          focus: "Upper Body",
        },
        {
          time: "6 PM",
          session: "Strength Training",
          focus: "Lower Body",
        },
      ],
      phone: "9373197246",
    },
    2: {
      name: "Sneha Rajput",
      role: "Weight Loss Specialist",
      status: "Active",
      image: "assets/images/trainer2.jpg",
      clientLoad: "56",
      sessionUtilization: "85%",
      clientRetention: "90%",
      monthlyRevenue: "$6,000",
      about:
        "Sneha specializes in customized weight loss programs and cardio workouts.",
      specializations: ["Weight Loss", "Cardio", "Diet Planning"],
      schedule: [
        { time: "9 AM", session: "Cardio Session", focus: "HIIT" },
        { time: "5 PM", session: "Cardio Session", focus: "Endurance" },
      ],
      phone: "918605789216",
    },
    3: {
      name: "Sameer Shinde",
      role: "Full Body Workout Expert",
      status: "Active",
      image: "assets/images/trainer3.jpg",
      clientLoad: "45",
      sessionUtilization: "88%",
      clientRetention: "92%",
      monthlyRevenue: "$5,500",
      about:
        "Sameer focuses on functional and full body workout programs for all fitness levels.",
      specializations: ["Full Body Workouts", "HIIT", "Mobility"],
      schedule: [
        { time: "7 AM", session: "Full Body", focus: "Strength" },
        { time: "7 PM", session: "Full Body", focus: "Endurance" },
      ],
      phone: "917700112233",
    },
    4: {
      name: "Virat Sharma",
      role: "Cardio & Endurance Coach",
      status: "Active",
      image: "assets/images/trainer4.jpg",
      clientLoad: "28",
      sessionUtilization: "82%",
      clientRetention: "88%",
      monthlyRevenue: "$4,800",
      about:
        "Virat is passionate about cardio and endurance training for improving stamina.",
      specializations: ["Cardio", "Endurance Training"],
      schedule: [
        { time: "6 AM", session: "Endurance", focus: "Running" },
        { time: "6 PM", session: "Cardio", focus: "Aerobics" },
      ],
      phone: "919970183749",
    },
    5: {
      name: "Smriti Patil",
      role: "Yoga & Pilates Instructor",
      status: "Active",
      image: "assets/images/trainer5.jpg",
      clientLoad: "40",
      sessionUtilization: "86%",
      clientRetention: "93%",
      monthlyRevenue: "$5,200",
      about:
        "Smriti brings 6 years of expertise in Yoga and Pilates for body flexibility and wellness.",
      specializations: ["Yoga", "Pilates", "Meditation"],
      schedule: [
        { time: "7 AM", session: "Yoga", focus: "Flexibility" },
        { time: "5 PM", session: "Pilates", focus: "Core Strength" },
      ],
      phone: "919370466337",
    },
    6: {
      name: "Shubham Raut",
      role: "Functional Training Specialist",
      status: "Active",
      image: "assets/images/trainer6.jpg",
      clientLoad: "33",
      sessionUtilization: "84%",
      clientRetention: "89%",
      monthlyRevenue: "$4,900",
      about:
        "Shubham is an expert in functional training techniques for overall body strength.",
      specializations: ["Functional Training", "Strength Conditioning"],
      schedule: [
        { time: "8 AM", session: "Functional", focus: "Core Stability" },
        { time: "6 PM", session: "Strength", focus: "Explosiveness" },
      ],
      phone: "916611223344",
    },
    7: {
      name: "Rohini Naik",
      role: "Yoga & Zumba Expert",
      status: "Active",
      image: "assets/images/trainer7.jpg",
      clientLoad: "50",
      sessionUtilization: "91%",
      clientRetention: "96%",
      monthlyRevenue: "$6,200",
      about: "Rohini combines Yoga and Zumba for a balanced fitness approach.",
      specializations: ["Yoga", "Zumba", "Dance Fitness"],
      schedule: [
        { time: "6 AM", session: "Yoga", focus: "Mindfulness" },
        { time: "7 PM", session: "Zumba", focus: "Dance Workout" },
      ],
      phone: "919933221100",
    },
    8: {
      name: "Shrikant Deshmukh",
      role: "Aerobics & Strength Trainer",
      status: "Active",
      image: "assets/images/trainer8.jpg",
      clientLoad: "29",
      sessionUtilization: "80%",
      clientRetention: "87%",
      monthlyRevenue: "$4,700",
      about:
        "Shrikant focuses on aerobics and strength training for better cardiovascular health.",
      specializations: ["Aerobics", "Strength Training"],
      schedule: [
        { time: "7 AM", session: "Aerobics", focus: "Cardio" },
        { time: "6 PM", session: "Strength", focus: "Weight Training" },
      ],
      phone: "918877665544",
    },
    9: {
      name: "Lokesh Bhatt",
      role: "Beginner Program Coach",
      status: "Active",
      image: "assets/images/trainer9.jpg",
      clientLoad: "18",
      sessionUtilization: "78%",
      clientRetention: "85%",
      monthlyRevenue: "$3,900",
      about:
        "Lokesh specializes in beginner programs and basic strength building.",
      specializations: ["Beginner Training", "Basic Strength"],
      schedule: [
        { time: "8 AM", session: "Beginner", focus: "Form Training" },
        { time: "5 PM", session: "Strength", focus: "Light Weights" },
      ],
      phone: "917755443322",
    },
  };

  localStorage.setItem("selectedTrainer", JSON.stringify(trainers[id]));
  window.location.href = "trainer.html";
}

///////////////

const trainer = JSON.parse(localStorage.getItem("selectedTrainer"));

if (trainer) {
  document.getElementById("trainerName").textContent = trainer.name;
  document.getElementById("trainerRole").textContent = trainer.role;
  document.getElementById("trainerStatus").textContent = trainer.status;
  document.getElementById("trainerImage").src = trainer.image;
  document.getElementById("clientLoad").textContent = trainer.clientLoad;
  document.getElementById("sessionUtilization").textContent =
    trainer.sessionUtilization;
  document.getElementById("clientRetention").textContent =
    trainer.clientRetention;
  document.getElementById("monthlyRevenue").textContent =
    trainer.monthlyRevenue;
  document.getElementById("aboutText").textContent = trainer.about;

  const specializationsDiv = document.getElementById("specializations");
  trainer.specializations.forEach((spec) => {
    const badge = document.createElement("span");
    badge.className = "specialization-badge";
    badge.textContent = spec;
    specializationsDiv.appendChild(badge);
  });

  const scheduleList = document.getElementById("scheduleList");
  trainer.schedule.forEach((item) => {
    const div = document.createElement("div");
    div.className = "schedule-item col";
    div.innerHTML = `
        <strong>${item.time}</strong><br>
        ${item.session}<br>
        <small class="text-muted">${item.focus}</small>`;
    scheduleList.appendChild(div);
  });
}

const sendMessageBtn = document.querySelector(".btn.btn-outline-primary");
const chatBox = document.getElementById("whatsappChat");
const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");

sendMessageBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
});

sendWhatsappBtn.addEventListener("click", () => {
  const message = document.getElementById("messageInput").value.trim();
  if (message && trainer && trainer.phone) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${trainer.phone}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  } else {
    alert(
      "Please enter a message or ensure trainer phone number is available."
    );
  }
});
