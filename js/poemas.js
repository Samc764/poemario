const form = document.getElementById('formPoema');
const tituloInput = document.getElementById('titulo');
const autorInput = document.getElementById('autor');
const textoInput = document.getElementById('texto');
const listaPoemas = document.getElementById('listaPoemas');
const statusMessage = document.getElementById('poemaStatus');

function setStatus(message, isError = false) {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? '#a00' : '#333';
}

function mostrarPoemas(poemas) {
    listaPoemas.innerHTML = '';
    if (!poemas || poemas.length === 0) {
        listaPoemas.innerHTML = '<li>No hay poemas guardados aún.</li>';
        return;
    }
    poemas.forEach(poema => {
        const item = document.createElement('li');
        item.className = 'poema-item';
        const autorTexto = poema.author ? ` - ${poema.author}` : '';
        item.innerHTML = `<h3>${poema.title}${autorTexto}</h3><p>${poema.text}</p>`;
        listaPoemas.appendChild(item);
    });
}

async function cargarPoemas() {
    try {
        setStatus('Cargando poemas...');
        const poemas = await request('/poems');
        mostrarPoemas(poemas);
        setStatus('Poemas actualizados.');
    } catch (error) {
        setStatus(`No se pudieron cargar los poemas: ${error.message}`, true);
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!getToken()) {
        alert('Debes iniciar sesión para guardar poemas.');
        return;
    }
    const poema = {
        title: tituloInput.value.trim(),
        author: autorInput.value.trim(),
        text: textoInput.value.trim(),
    };
    if (!poema.title || !poema.text) return;
    try {
        await request('/poems', {
            method: 'POST',
            body: JSON.stringify(poema),
        });
        form.reset();
        await cargarPoemas();
        alert('Poema guardado correctamente.');
    } catch (error) {
        alert(error.message);
    }
});

document.addEventListener('DOMContentLoaded', cargarPoemas);
