// src/auth.js

let isAuthenticated = false;

export function login(username, password) {
  // Puedes cambiar esto por validación real más adelante
  if (username === 'admin' && password === '1234') {
    isAuthenticated = true;
    return true;
  }
  return false;
}

export function logout() {
  isAuthenticated = false;
}

export function isLoggedIn() {
  return isAuthenticated;
}
