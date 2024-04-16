export interface User {
    id?: string; // Identificador único del usuario
    name: string; // Nombre del usuario
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña del usuario (debe encriptarse en el backend)
    role: 'admin' | 'viewer'; // Rol del usuario (administrador o visualizador)
  }
  