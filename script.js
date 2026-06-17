const letras = "abcdefghijklmnopqrstuvwxyz";

function generarToken() {
    // Genera una palabra suelta de 1 a 3 letras (mayúsculas/minúsculas mezcladas)
    const length = Math.random() < 0.7 ? 1 : (Math.random() < 0.5 ? 2 : 3);
    let s = '';
    for (let i = 0; i < length; i++) {
        const c = letras.charAt(Math.floor(Math.random() * letras.length));
        s += Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
    }
    return s;
}

function crearLetra() {
    const letra = document.createElement('span');
    letra.textContent = generarToken();

    letra.style.position = 'fixed';
    letra.style.left = Math.random() * (window.innerWidth - 40) + 'px';
    letra.style.top = window.innerHeight + 20 + 'px';
    letra.style.zIndex = 9999;
    letra.style.fontSize = (Math.random() * 24 + 12) + 'px';
    letra.style.color = '#111';
    letra.style.opacity = (Math.random() * 0.6 + 0.25).toString();
    letra.style.pointerEvents = 'none';

    document.body.appendChild(letra);

    let posicionY = window.innerHeight;
    const velocidad = Math.random() * 2 + 1;

    const animacion = setInterval(() => {
        posicionY -= velocidad;
        letra.style.top = posicionY + 'px';

        if (posicionY < -80) {
            clearInterval(animacion);
            letra.remove();
        }
    }, 20);
}

setInterval(crearLetra, 300);

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

        function mostrarPoemas(poemas) {
            listaPoemas.innerHTML = '';
            if (poemas.length === 0) {
                listaPoemas.innerHTML = '<li>No hay poemas guardados aún.</li>';
                return;
            }
            poemas.forEach(poema => {
                const item = document.createElement('li');
                item.className = 'poema-item';
                const autorTexto = poema.autor ? ` - ${poema.autor}` : '';
                item.innerHTML = `<h3>${poema.titulo}${autorTexto}</h3><p>${poema.texto}</p>`;
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