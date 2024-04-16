import { Injectable } from '@angular/core';
import { AuthToken } from './modelos/auth-token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public readonly tokenKey = 'auth_token'; // Clave para almacenar el token en localStorage

  constructor() {}

  // Obtener el token de autenticación del localStorage
  getToken(): AuthToken | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      return { token };
    }
    return null;
  }

  // Guardar el token de autenticación en localStorage
  setToken(authToken: AuthToken): void {
    localStorage.setItem(this.tokenKey, authToken.token);
  }

  // Eliminar el token de autenticación del localStorage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Verificar si hay un token de autenticación en localStorage
  hasToken(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  // Obtener el payload decodificado del token
  getTokenPayload(): any {
    const authToken = this.getToken();
    if (authToken) {
      try {
        return jwtDecode(authToken.token);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null; // Retorna true si hay un token, false si no hay
  }

  // Eliminar el token de autenticación del localStorage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Verificar si el token es válido y tiene un rol específico
  isAdmin(): boolean {
    const payload = this.getTokenPayload();
    return payload && payload.role === 'admin';
  }
}
