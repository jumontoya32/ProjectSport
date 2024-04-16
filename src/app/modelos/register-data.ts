export interface RegisterData {
  name: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario
  confirmPassword: string; // Contraseña del usuario
  role: 'admin' | 'viewer'; // Rol del usuario (administrador o visualizador)
}
