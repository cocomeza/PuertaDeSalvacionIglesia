// biblia.js mejorado para mejor lectura y experiencia móvil

const libroSelect = document.getElementById('libro');
const resultadoDiv = document.getElementById('resultado');

const libros = [
  // Pentateuco
  "genesis",
  "exodo",
  "levitico",
  "numeros",
  "deuteronomio",

  // Libros históricos
  "josue",
  "jueces",
  "rut",
  "1_samuel",
  "2_samuel",
  "1_reyes",
  "2_reyes",
  "1_cronicas",
  "2_cronicas",
  "esdras",
  "nehemias",
  "ester",

  // Libros poéticos y sapienciales
  "job",
  "salmos",
  "proverbios",
  "ecclesiastes",
  "cantares",

  // Profetas mayores y menores
  "isaias",
  "jeremias",
  "lamentaciones",
  "ezequiel",
  "daniel",
  "oseas",
  "joel",
  "amos",
  "abdias",
  "jonas",
  "miqueas",
  "nahum",
  "habacuc",
  "sofonias",
  "hageo",
  "zacarias",
  "malaquias",

  // Nuevo Testamento
  // Evangelios
  "mateo",
  "marcos",
  "lucas",
  "juan",

  // Historia
  "hechos",

  // Cartas de Pablo
  "romanos",
  "1_corintios",
  "2_corintios",
  "galatas",
  "efesios",
  "filipenses",
  "colosenses",
  "1_tesalonicenses",
  "2_tesalonicenses",
  "1_timoteo",
  "2_timoteo",
  "tito",
  "filemon",

  // Otras cartas y Apocalipsis
  "hebreos",
  "santiago",
  "1_pedro",
  "2_pedro",
  "1_juan",
  "2_juan",
  "3_juan",
  "judas",
  "apocalipsis"
];

// Función para cargar los libros en el select
function cargarLibros() {
  libros.forEach(libro => {
    const option = document.createElement('option');
    option.value = libro;
    option.textContent = libro.charAt(0).toUpperCase() + libro.slice(1);
    libroSelect.appendChild(option);
  });
}

// Muestra una animación de carga mientras se busca el texto
function mostrarCargando() {
  resultadoDiv.innerHTML = `
    <div class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <div>Cargando texto...</div>
    </div>
  `;
}

// Carga y muestra el contenido del libro seleccionado
function mostrarLibro() {
  const libro = libroSelect.value;
  if (!libro) return;
  const archivo = `biblia/${libro}.txt`;

  mostrarCargando();

  fetch(archivo)
    .then(res => {
      if (!res.ok) throw new Error("Archivo no encontrado");
      return res.text();
    })
    .then(texto => {
      resultadoDiv.innerHTML = `<h3 class="mb-3 text-center">${libro.toUpperCase()}</h3>`;
      resultadoDiv.innerHTML += formatearBiblia(texto);
      actualizarFuente(); // Aplica el tamaño de fuente elegido
    })
    .catch(err => {
      resultadoDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
    });
}

// Formatea el texto de la biblia para mejor lectura en pantalla
function formatearBiblia(texto) {
  // Supone que cada línea es un versículo con formato "1:1 En el principio..."
  const lineas = texto.split('\n').filter(l => l.trim() !== "");
  let html = '<div class="versiculos">';
  lineas.forEach(linea => {
    // Busca el número de versículo (ej: "1:1")
    const match = linea.match(/^(\d+:\d+)\s+(.*)$/);
    if (match) {
      html += `<div class="versiculo"><span class="versiculo-numero">${match[1]}</span> ${match[2]}</div>`;
    } else {
      html += `<div class="versiculo">${linea}</div>`;
    }
  });
  html += '</div>';
  return html;
}

// ----------- Botón de modo nocturno -----------
const btnModo = document.createElement('button');
btnModo.className = 'modo-toggle btn btn-dark rounded-circle shadow';
btnModo.title = 'Modo nocturno';
btnModo.innerHTML = '<i class="fas fa-moon"></i>';
btnModo.style.position = 'fixed';
btnModo.style.bottom = '20px';
btnModo.style.right = '20px';
btnModo.style.zIndex = 1000;
document.body.appendChild(btnModo);

btnModo.addEventListener('click', () => {
  document.body.classList.toggle('modo-nocturno');
  btnModo.innerHTML = document.body.classList.contains('modo-nocturno')
    ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ----------- Controles de tamaño de fuente -----------
const controlesFuente = document.createElement('div');
controlesFuente.className = 'controles-fuente d-flex gap-2 align-items-center';
controlesFuente.innerHTML = `
  <button class="btn btn-sm btn-outline-secondary" id="disminuir-fuente" title="Reducir letra">A-</button>
  <button class="btn btn-sm btn-outline-secondary" id="aumentar-fuente" title="Aumentar letra">A+</button>
`;
document.body.appendChild(controlesFuente);

let tamañoFuente = 1.2; // Valor inicial en rem

// Aplica el tamaño de fuente elegido al resultado
function actualizarFuente() {
  resultadoDiv.style.fontSize = `${tamañoFuente}rem`;
}

// Aumenta el tamaño de letra
document.getElementById('aumentar-fuente').onclick = () => {
  tamañoFuente = Math.min(tamañoFuente + 0.1, 2);
  actualizarFuente();
};

// Disminuye el tamaño de letra
document.getElementById('disminuir-fuente').onclick = () => {
  tamañoFuente = Math.max(tamañoFuente - 0.1, 0.8);
  actualizarFuente();
};

// Inicialización de la página
libroSelect.addEventListener('change', mostrarLibro);
window.onload = () => {
  cargarLibros();
  actualizarFuente();
};
