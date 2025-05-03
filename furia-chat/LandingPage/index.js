const modal = document.getElementById("modalNome");
const btnAbrir = document.getElementById("abrirModal");
const form = document.getElementById("formNome");
const loader = document.getElementById('loader');

btnAbrir.addEventListener("click", () => {
  modal.style.display = "flex";
});

form.addEventListener("submit", function(e) {
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("isFirstVisit");
  e.preventDefault();
  const nome = document.getElementById("nomeInput").value.trim();
  if (nome) {
    localStorage.setItem("nomeTorcedor", nome);
    loader.classList.remove("hidden");

    setTimeout(() => {
      window.location.href = '../ChatCs/chatCs.html';
    }, 1500);
  }
});
