const API_URL = 'http://127.0.0.1:8000/api';
const TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'authUser';

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function getUsername() {
    return localStorage.getItem(USERNAME_KEY);
}

function setAuth(token, username) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
}

function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
}

function getAuthHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
    };
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });
    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch (error) {
        data = text;
    }
    if (!response.ok) {
        throw new Error(data?.detail || response.statusText || 'Error en la petición');
    }
    return data;
}
