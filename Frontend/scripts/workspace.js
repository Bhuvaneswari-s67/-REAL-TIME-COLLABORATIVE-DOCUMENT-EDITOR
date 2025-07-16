let allDocs = [];

async function loadDocuments() {
  try {
    const res = await fetch("http://localhost:8080/api/documents");
    allDocs = await res.json();
    renderDocuments(allDocs);
  } catch (err) {
    console.error("Failed to load documents:", err);
    alert("Could not fetch documents.");
  }
}

function renderDocuments(docs) {
  const container = document.getElementById("fileGrid");
  container.innerHTML = "";

  docs.forEach(doc => {
    const card = document.createElement("div");
    card.className = "file-card";
    card.innerHTML = `
      <div class="file-icon">📄</div>
      <div class="file-name">${doc.title}</div>
      <div class="file-actions">
        <span class="fav-toggle" onclick="toggleFavourite(${doc.id}, ${doc.favourite})">
          ${doc.favourite ? "⭐" : "☆"}
        </span>
        <span class="delete-doc" onclick="deleteDoc(${doc.id})">🗑️</span>
      </div>
    `;
    card.onclick = (e) => {
      if (e.target.classList.contains("fav-toggle") || e.target.classList.contains("delete-doc")) return;
      localStorage.setItem("documentId", doc.id);
      location.href = "editor.html";
    };
    container.appendChild(card);
  });
}

function createItem() {
  const name = document.getElementById("itemName").value.trim();
  if (!name) return alert("Enter a name.");

  fetch("http://localhost:8080/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: name, contentJson: "" })
  }).then(() => {
    closeModal();
    loadDocuments();
  });
}

async function toggleFavourite(id, isFav) {
  try {
    const res = await fetch(`http://localhost:8080/api/documents/${id}`);
    const doc = await res.json();

    await fetch(`http://localhost:8080/api/documents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: doc.title,
        contentJson: doc.contentJson,
        favourite: !isFav
      })
    });

    loadDocuments();
  } catch (err) {
    console.error("Failed to toggle favourite:", err);
    alert("Could not update favourite. Please try again.");
  }
}



function deleteDoc(id) {
  if (!confirm("Are you sure you want to delete this document?")) return;

  fetch(`http://localhost:8080/api/documents/${id}`, {
    method: "DELETE"
  }).then(() => loadDocuments());
}

document.querySelector(".search-bar").addEventListener("input", function () {
  const term = this.value.toLowerCase();
  const filtered = allDocs.filter(doc => doc.title.toLowerCase().includes(term));
  renderDocuments(filtered);
});

document.getElementById("recent-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  const sorted = [...allDocs].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
  renderDocuments(sorted.slice(0, 10));
});

document.getElementById("fav-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  const favourites = allDocs.filter(doc => doc.favourite);
  renderDocuments(favourites);
});

window.onload = loadDocuments;
