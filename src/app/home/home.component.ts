import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public tokenService: TokenService, private router: Router) {}

  // Método para cerrar sesión
  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }

  
}
