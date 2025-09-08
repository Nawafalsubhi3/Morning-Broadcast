import { db, auth } from './firebase-config.js';
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.loginAdmin = async function() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginAdmin").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadRequests();
  } catch (e) {
    alert("خطأ في تسجيل الدخول");
  }
};

window.addSegment = async function() {
  const title = document.getElementById("segmentTitle").value;
  const content = document.getElementById("segmentContent").value;
  await addDoc(collection(db, "segments"), {
    title,
    content,
    status: "available"
  });
  alert("تمت إضافة الفقرة");
};

async function loadRequests() {
  const q = query(collection(db, "studentChoices"), where("status", "==", "pending"));
  const snapshot = await getDocs(q);
  const list = document.getElementById("requestsList");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${data.studentName}</strong> - ${data.studentClass} - ${data.segmentTitle} - ${data.chosenDay}</p>
      <button onclick="approve('${doc.id}')">موافقة</button>
      <button onclick="reject('${doc.id}')">رفض</button>`;
    list.appendChild(div);
  });
}

window.approve = async function(id) {
  await updateDoc(doc(db, "studentChoices", id), { status: "approved" });
  loadRequests();
};

window.reject = async function(id) {
  await updateDoc(doc(db, "studentChoices", id), { status: "rejected" });
  loadRequests();
};
