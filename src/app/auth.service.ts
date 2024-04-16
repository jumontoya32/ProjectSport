import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginData } from './modelos/login-data';
import { AuthToken } from './modelos/auth-token';
import { RegisterData } from './modelos/register-data';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL base de tu servidor
  

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Iniciar sesión
  login(loginData: LoginData): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.apiUrl}/login`, loginData).pipe(
        tap((response: AuthToken) => {
            if (response && response.token) {
                // Guarda el token en localStorage
                this.setToken(response.token);
            }
        }),
        catchError((error) => {
            console.error('Error al iniciar sesión:', error);
            return throwError(error);
        })
    );
}

private setToken(token: string): void {
  localStorage.setItem(this.tokenService.tokenKey, token);
}

  // Registrar un nuevo usuario
  register(registerData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(error);
      })
    );
  }
}

