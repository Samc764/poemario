const letras = "abcdefghijklmnopqrstuvwxyz";

function generarToken() {
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
