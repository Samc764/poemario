const STORAGE_KEY = 'poemasGuardados';
const form = document.getElementById('formPoema');
const tituloInput = document.getElementById('titulo');
const autorInput = document.getElementById('autor');
const textoInput = document.getElementById('texto');
const listaPoemas = document.getElementById('listaPoemas');

function cargarPoemas() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const poemas = stored ? JSON.parse(stored) : [];
    mostrarPoemas(poemas);
}

function guardarPoema(poema) {
    const stored = localStorage.getItem(STORAGE_KEY);
    const poemas = stored ? JSON.parse(stored) : [];
    poemas.unshift(poema);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(poemas));
    mostrarPoemas(poemas);
}

function borrarPoema(index) {
    const stored = localStorage.getItem(STORAGE_KEY);
    const poemas = stored ? JSON.parse(stored) : [];
    poemas.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(poemas));
    mostrarPoemas(poemas);
}

function mostrarPoemas(poemas) {
    listaPoemas.innerHTML = '';
    if (poemas.length === 0) {
        listaPoemas.innerHTML = '<li>No hay poemas guardados aún.</li>';
        return;
    }
    poemas.forEach((poema, index) => {
        const item = document.createElement('li');
        item.className = 'poema-item';
        const autorTexto = poema.autor ? ` - ${poema.autor}` : '';
        item.innerHTML = `<div class="poema-header"><h3>${poema.titulo}${autorTexto}</h3><button class="borrar-poema" data-index="${index}">Borrar</button></div><p>${poema.texto}</p>`;
        const borrarBtn = item.querySelector('.borrar-poema');
        borrarBtn.addEventListener('click', () => borrarPoema(index));
        listaPoemas.appendChild(item);
    });
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const poema = {
        titulo: tituloInput.value.trim(),
        autor: autorInput.value.trim(),
        texto: textoInput.value.trim()
    };
    if (!poema.titulo || !poema.texto) return;
    guardarPoema(poema);
    form.reset();
});

document.addEventListener('DOMContentLoaded', cargarPoemas);
