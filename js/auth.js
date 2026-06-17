const authMessage = document.getElementById('authMessage');
const logoutButton = document.getElementById('logoutButton');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Local fallback for demos when backend is unreachable
const LOCAL_USERS_KEY = 'localUsers';
function getLocalUsers() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveLocalUser(username, password) {
    const users = getLocalUsers();
    users[username] = { password };
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function findLocalUser(username) {
    const users = getLocalUsers();
    return users[username] || null;
}

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
        // If backend unreachable, try local fallback (demo only)
        if (error.message && error.message.toLowerCase().includes('no se pudo conectar')) {
            const user = findLocalUser(username);
            if (user && user.password === password) {
                setAuth('local-token-' + username, username);
                alert('Has iniciado sesión (modo local).');
                window.location.href = 'home.html';
                return;
            }
            alert('No se pudo conectar al backend y no existe la cuenta local.');
        } else {
            alert(error.message);
        }
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
        // If backend unreachable, create a local fallback account so user can try the site
        if (error.message && error.message.toLowerCase().includes('no se pudo conectar')) {
            saveLocalUser(username, password);
            alert('Backend inaccesible — cuenta creada localmente en tu navegador. Inicia sesión.');
            registerForm.reset();
            window.location.href = 'index.html';
            return;
        }
        alert(error.message);
    }
});

document.addEventListener('DOMContentLoaded', updateAuthState);
