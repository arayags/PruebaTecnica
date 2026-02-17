// Interfaz que representa la estructura necesaria para crear un usuario
export interface User {
  usuario_id: number;
  usuario_Nombre: string;
  usuario_Apellido: string;
  usuario_Rol: number;
  usuario_Correo: string;
  usuario_Contrasena: string;
  usuario_user: string;
}

export type CreateUser = Omit<User, 'usuario_id'>;
