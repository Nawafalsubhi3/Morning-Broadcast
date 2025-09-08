import { db } from './firebase-config.js';
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let selectedSegment = null;
let studentData = {};

function loginStudent() {
  studentData.name = document.getElementById("studentName").value.trim();
  studentData.class = document.getElementById("studentClass").value.trim();
  studentData.id = document.getElementById("studentId").value.trim();

  if (!studentData.name || !studentData.class || !studentData.id) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("segments").style.display = "block";
  loadSegments();
}

async function loadSegments() {
  const q = query(collection(db, "segments"), where("status", "==", "available"));
  const snapshot = await getDocs(q);
  const list = document.getElementById("segmentsList");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "segment-card";
    div.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p><button onclick='selectSegment(${JSON.stringify(data)})'>اختر</button>`;
    list.appendChild(div);
  });
}

window.selectSegment = function(data) {
  selectedSegment = data;
  document.getElementById("segments").style.display = "none";
  document.getElementById("chooseDay").style.display = "block";
};

window.submitChoice = async function() {
  const day = document.getElementById("daySelect").value;
  await addDoc(collection(db, "studentChoices"), {
    studentName: studentData.name,
    studentClass: studentData.class,
    segmentTitle: selectedSegment.title,
    chosenDay: day,
    status: "pending",
    timestamp: new Date()
  });
  document.getElementById("statusMsg").innerText = "تم إرسال طلبك بنجاح، انتظر موافقة المعلم.";
  document.getElementById("chooseDay").style.display = "none";
};

window.loginStudent = loginStudent;
