const formGaleria = document.getElementById('formGaleria');
const tituloImagen = document.getElementById('tituloImagen');
const urlImagen = document.getElementById('urlImagen');
const descripcion = document.getElementById('descripcion');
const listaImagenes = document.getElementById('listaImagenes');
const statusMessage = document.getElementById('galeriaStatus');

function setGaleriaStatus(message, isError = false) {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? '#a00' : '#333';
}

function mostrarGaleria(imagenes) {
    listaImagenes.innerHTML = '';
    if (!imagenes || imagenes.length === 0) {
        listaImagenes.innerHTML = '<li>No hay imágenes guardadas aún.</li>';
        return;
    }
    imagenes.forEach(item => {
        const elemento = document.createElement('li');
        elemento.className = 'galeria-item';
        elemento.innerHTML = `
            <div class="galeria-header">
                <h3>${item.title}</h3>
            </div>
            <img src="${item.url}" alt="${item.title}">
            <p>${item.description || ''}</p>
        `;
        listaImagenes.appendChild(elemento);
    });
}

async function cargarGaleria() {
    try {
        setGaleriaStatus('Cargando galería...');
        const imagenes = await request('/images');
        mostrarGaleria(imagenes);
        setGaleriaStatus('Galería actualizada.');
    } catch (error) {
        setGaleriaStatus(`No se pudo cargar la galería: ${error.message}`, true);
    }
}

formGaleria.addEventListener('submit', async event => {
    event.preventDefault();
    if (!getToken()) {
        alert('Debes iniciar sesión para guardar imágenes.');
        return;
    }
    const item = {
        title: tituloImagen.value.trim(),
        url: urlImagen.value.trim(),
        description: descripcion.value.trim(),
    };
    if (!item.title || !item.url) return;
    try {
        await request('/images', {
            method: 'POST',
            body: JSON.stringify(item),
        });
        formGaleria.reset();
        await cargarGaleria();
        alert('Imagen guardada correctamente.');
    } catch (error) {
        alert(error.message);
    }
});

document.addEventListener('DOMContentLoaded', cargarGaleria);
