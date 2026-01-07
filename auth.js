const API_URL = 'http://localhost:8080/api';

async function login(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('authToken', data.token);
            window.location.href = '../index.html'; // 👉 HOME
        } else {
            document.getElementById('loginError').textContent =
                'Sai tài khoản hoặc mật khẩu';
        }
    } catch {
        document.getElementById('loginError').textContent =
            'Không kết nối được server';
    }
}

async function register(e) {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (res.ok) {
            window.location.href = 'login.html'; // 👉 QUAY VỀ LOGIN
        } else {
            document.getElementById('registerError').textContent =
                'Tài khoản hoặc email đã tồn tại';
        }
    } catch {
        document.getElementById('registerError').textContent =
            'Không kết nối được server';
    }
}
