const authMessage = document.getElementById('authMessage');
const authStatus = document.getElementById('authStatus');
const logoutButton = document.getElementById('logoutButton');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function updateAuthState() {
    const username = getUsername();
    if (getToken() && username) {
        authMessage.textContent = `Sesión iniciada como ${username}. Ahora puedes guardar poemas e imágenes.`;
        logoutButton.style.display = 'inline-block';
    } else {
        authMessage.textContent = 'Inicia sesión o regístrate para guardar y ver tus poemas e imágenes.';
        logoutButton.style.display = 'none';
    }
}

logoutButton?.addEventListener('click', () => {
    clearAuth();
    updateAuthState();
    alert('Has cerrado sesión.');
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
        updateAuthState();
        alert('Has iniciado sesión correctamente.');
        loginForm.reset();
    } catch (error) {
        alert(error.message);
    }
});

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    if (!username || !email || !password) return;
    try {
        await request('/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
        });
        alert('Cuenta creada correctamente. Ahora inicia sesión.');
        registerForm.reset();
    } catch (error) {
        alert(error.message);
    }
});

document.addEventListener('DOMContentLoaded', updateAuthState);
