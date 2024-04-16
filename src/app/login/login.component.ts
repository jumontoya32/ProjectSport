import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginData } from '../modelos/login-data';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: LoginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Guarda el token utilizando el servicio TokenService
        this.tokenService.setToken(response);
        // Redirige a la página de inicio u otra página deseada
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
