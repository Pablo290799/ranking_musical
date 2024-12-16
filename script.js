// Musicas a buscar dentro del top(estático)
const songs = [
  { title: "WITHOUT ME", artist: "EMINEM", img: "images/without_me.jpg", position: 0, favorite: false },
  { title: "ÑERI", artist: "TRUENO", img: "images/ñeri.jpg", position: 1, favorite: false },
  { title: "KHÉ", artist: "RAUW ALEJANDRO", img: "images/khe.jpg", position: 2, favorite: false },
  { title: "DEGENERE", artist: "MYKE TOWERS", img: "images/degenere.jpg", position: 3, favorite: false },
  { title: "CADA DÍA", artist: "KCHIPORROS", img: "images/cada_dia.jpg", position: 4, favorite: false }
];

console.log("Musicas generadas en el top", songs);

// Función para asignar favoritos aleatoriamente
function assignFavorites() {
  songs.forEach(song => song.favorite = false);
  const favoriteCount = Math.floor(Math.random() * 2) + 1;
  const selectedFavorites = new Set();

  while (selectedFavorites.size < favoriteCount) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    selectedFavorites.add(randomIndex);
  }

  selectedFavorites.forEach(index => {
    songs[index].favorite = true;
  });
}

function displayRanking() {
  const rankingList = document.getElementById("ranking");
  rankingList.innerHTML = "";

  songs.forEach((song, index) => {
    let arrow = "";
    if (index === 0) arrow = "";
    // Solo mostrar la flecha si la canción no tiene la estrella de favorito
    else if (!song.favorite && song.position > index) arrow = `<span class="arrow up">⬆️</span>`;
    else if (!song.favorite && song.position < index) arrow = `<span class="arrow down">⬇️</span>`;
    else if (!song.favorite) arrow = `<span class="arrow stay">➖</span>`;

    const favoriteStar = song.favorite ? `<span class="favorite">⭐</span>` : "";

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    li.innerHTML = `
      <img src="${song.img}" alt="${song.title}" class="song-image">
      <div class="song-info">
        <div class="title">${index + 1}. ${song.title}</div>
        <div class="artist">${song.artist}</div>
      </div>
      ${arrow}
      <div class="favorite-container">${favoriteStar}</div>
    `;
    rankingList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  assignFavorites();
  displayRanking();
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  songs.sort(() => Math.random() - 0.5);
  assignFavorites();
  displayRanking();
  console.log("Mezclar ranking de forma aleatoria");
});

function createImage() {
  console.log("Creando imagen...");

  const container = document.getElementById("ranking");

  html2canvas(container, { scale: 1 }).then(canvas => {
    const image = canvas.toDataURL("image/png");
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";

    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.alt = "Ranking generado";
    imgElement.style.marginTop = "20px";
    imgElement.style.border = "1px solid #ddd";
    imgElement.style.maxWidth = "100%";
    imageContainer.appendChild(imgElement);

    // Botón para descargar la imagen
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Descargar Imagen (PNG)";
    downloadButton.classList.add("btn-primary");
    downloadButton.style.marginTop = "10px";
    downloadButton.onclick = () => {
      const a = document.createElement("a");
      a.href = image;
      a.download = "ranking-musical.png";
      a.click();
      console.log("Descargar la imagen en PNG");
    };

    // Botón para exportar a PDF
    const exportPdfButton = document.createElement("button");
    exportPdfButton.textContent = "Exportar a PDF";
    exportPdfButton.classList.add("btn-secondary");
    exportPdfButton.style.marginTop = "10px";
    exportPdfButton.onclick = () => {
      const { jsPDF } = window.jspdf; // Asegura que jsPDF esté disponible
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Mantener proporción

      try {
        pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight); // Añadir imagen al PDF
        pdf.save("ranking-musical.pdf");
        console.log("Exportar la imagen en PDF");
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un problema al generar el archivo PDF. Intenta nuevamente.");
      }
    };

    imageContainer.appendChild(downloadButton);
    imageContainer.appendChild(exportPdfButton);
  }).catch(error => {
    console.error("Error al generar la imagen:", error);
    alert("Hubo un problema al generar la imagen. Intenta nuevamente.");
  });
}

document.getElementById("createImgBtn").addEventListener("click", createImage);
