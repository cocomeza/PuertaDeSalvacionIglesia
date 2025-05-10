const libroSelect = document.getElementById('libro');
const resultadoDiv = document.getElementById('resultado');

// Libros disponibles (usa los archivos reales que tenés en /biblia)
const libros = ["genesis", "exodo", "mateo", "marcos", "lucas", "juan", "hechos"];

function cargarLibros() {
  libros.forEach(libro => {
    const option = document.createElement('option');
    option.value = libro;
    option.textContent = libro.charAt(0).toUpperCase() + libro.slice(1);
    libroSelect.appendChild(option);
  });
}

// Cargar el contenido del libro seleccionado
function mostrarLibro() {
  const libro = libroSelect.value;
  if (!libro) return;

  const archivo = `biblia/${libro}.txt`;

  fetch(archivo)
    .then(res => {
      if (!res.ok) throw new Error("Archivo no encontrado");
      return res.text();
    })
    .then(texto => {
      resultadoDiv.innerHTML = `<h3 class="mb-3">${libro.toUpperCase()}</h3><pre>${texto}</pre>`;
    })
    .catch(err => {
      resultadoDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
    });
}

libroSelect.addEventListener('change', mostrarLibro);
window.onload = cargarLibros;
