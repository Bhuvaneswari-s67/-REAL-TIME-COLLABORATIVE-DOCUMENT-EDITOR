let stompClient = null;
const documentId = localStorage.getItem("documentId");
let isRemoteUpdate = false;

function connectWebSocket(documentId) {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);

    stompClient.subscribe(`/topic/changes/${documentId}`, function (message) {
      const editor = document.getElementById('editor');
      const newContent = message.body;

      if (editor.innerHTML !== newContent) {
        isRemoteUpdate = true;

        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        editor.innerHTML = newContent;

        if (range) {
          selection.removeAllRanges();
          selection.addRange(range);
        }

        isRemoteUpdate = false;
      }
    });

    document.getElementById("editor").addEventListener("input", () => {
      if (isRemoteUpdate) return;

      const content = document.getElementById("editor").innerHTML;
      stompClient.send(`/app/edit/${documentId}`, {}, content);
    });
  });
}

function downloadAsPDF() {
  const title = document.querySelector(".doc-title").value || "document";
  const content = document.getElementById("editor");

  const opt = {
    margin:       0.5,
    filename:     `${title}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(content).set(opt).save();
}

function execCmd(command) {
  if (command === 'createLink') {
    const url = prompt("Enter the link URL:");
    if (url) {
      document.execCommand(command, false, url);
    }
  } else {
    document.execCommand(command, false, null);
  }
}

function changeFont(font) {
  document.execCommand("fontName", false, font);
}

function changeFontSize(size) {
  document.execCommand("fontSize", false, size);
}

function changeColor(color) {
  document.execCommand("foreColor", false, color);
}

function highlightText() {
  document.execCommand("backColor", false, "yellow");
}


function triggerImageUpload() {
  document.getElementById("imageInput").click();
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.style.maxWidth = "100%";

    const range = window.getSelection().getRangeAt(0);
    range.insertNode(img);
  };
  reader.readAsDataURL(file);
}

async function saveDoc() {
  const content = document.getElementById("editor").innerHTML;
  const title = document.querySelector(".doc-title").value;

  await fetch(`http://localhost:8080/api/documents/${documentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, contentJson: content })
  });

  alert(`Document "${title}" saved to backend.`);
}

window.onload = async function () {
  if (documentId) {
    const res = await fetch(`http://localhost:8080/api/documents/${documentId}`);
    const doc = await res.json();
    document.querySelector(".doc-title").value = doc.title;
    document.getElementById("editor").innerHTML = doc.contentJson;

    connectWebSocket(documentId);
  } else {
    alert("No document selected.");
  }

  const imageInput = document.getElementById("imageInput");
  if (imageInput) {
    imageInput.addEventListener("change", handleImageUpload);
  }
};
