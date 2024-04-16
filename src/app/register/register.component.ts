import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterData } from '../modelos/register-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerData: RegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'viewer',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.registerData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        // Realiza acciones adicionales después del registro
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }
}
