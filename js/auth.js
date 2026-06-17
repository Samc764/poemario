const authMessage = document.getElementById('authMessage');
const logoutButton = document.getElementById('logoutButton');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function updateAuthState() {
    const username = getUsername();
    if (authMessage) {
        if (getToken() && username) {
            authMessage.textContent = `Sesión iniciada como ${username}.`;
        } else {
            authMessage.textContent = 'Inicia sesión o regístrate para usar la aplicación.';
        }
    }
    if (logoutButton) {
        logoutButton.style.display = getToken() ? 'inline-block' : 'none';
    }
}

logoutButton?.addEventListener('click', () => {
    clearAuth();
    updateAuthState();
    alert('Has cerrado sesión.');
    window.location.href = 'index.html';
});

loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!username || !password) return;
    try {
        const data = await request('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        setAuth(data.access_token, username);
        alert('Has iniciado sesión correctamente.');
        window.location.href = 'home.html';
    } catch (error) {
        alert(error.message);
    }
});

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    if (!username || !password) return;
    try {
        await request('/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        alert('Cuenta creada correctamente. Ahora inicia sesión.');
        registerForm.reset();
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
});

document.addEventListener('DOMContentLoaded', updateAuthState);
