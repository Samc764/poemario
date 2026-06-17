const STORAGE_KEY_GALERIA = 'galeriaGuardada';
const formGaleria = document.getElementById('formGaleria');
const tituloImagen = document.getElementById('tituloImagen');
const urlImagen = document.getElementById('urlImagen');
const descripcion = document.getElementById('descripcion');
const listaImagenes = document.getElementById('listaImagenes');

function cargarGaleria() {
    const stored = localStorage.getItem(STORAGE_KEY_GALERIA);
    const imagenes = stored ? JSON.parse(stored) : [];
    mostrarGaleria(imagenes);
}

function guardarImagen(item) {
    const stored = localStorage.getItem(STORAGE_KEY_GALERIA);
    const imagenes = stored ? JSON.parse(stored) : [];
    imagenes.unshift(item);
    localStorage.setItem(STORAGE_KEY_GALERIA, JSON.stringify(imagenes));
    mostrarGaleria(imagenes);
}

function borrarImagen(index) {
    const stored = localStorage.getItem(STORAGE_KEY_GALERIA);
    const imagenes = stored ? JSON.parse(stored) : [];
    imagenes.splice(index, 1);
    localStorage.setItem(STORAGE_KEY_GALERIA, JSON.stringify(imagenes));
    mostrarGaleria(imagenes);
}

function mostrarGaleria(imagenes) {
    listaImagenes.innerHTML = '';
    if (imagenes.length === 0) {
        listaImagenes.innerHTML = '<li>No hay imágenes guardadas aún.</li>';
        return;
    }
    imagenes.forEach((item, index) => {
        const elemento = document.createElement('li');
        elemento.className = 'galeria-item';
        elemento.innerHTML = `
            <div class="galeria-header">
                <h3>${item.titulo}</h3>
                <button class="borrar-imagen" data-index="${index}">Borrar</button>
            </div>
            <img src="${item.url}" alt="${item.titulo}">
            <p>${item.descripcion}</p>
        `;

        elemento.querySelector('.borrar-imagen').addEventListener('click', () => borrarImagen(index));
        listaImagenes.appendChild(elemento);
    });
}

function contarPalabras(texto) {
    return texto.trim().split(/\s+/).filter(Boolean).length;
}

formGaleria.addEventListener('submit', event => {
    event.preventDefault();
    const item = {
        titulo: tituloImagen.value.trim(),
        url: urlImagen.value.trim(),
        descripcion: descripcion.value.trim()
    };
    if (!item.titulo || !item.url || !item.descripcion) return;
    const palabras = contarPalabras(item.descripcion);
    if (palabras > 200) {
        alert('La descripción no puede tener más de 200 palabras. Actualmente tiene ' + palabras + '.');
        return;
    }
    guardarImagen(item);
    formGaleria.reset();
});

document.addEventListener('DOMContentLoaded', cargarGaleria);