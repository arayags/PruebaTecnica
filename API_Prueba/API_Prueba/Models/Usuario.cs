namespace API_Prueba.Models
{
    public class Usuario
    {
        public int Usuario_id { get; set; }          // Se asigna automáticamente al crear
        public string Usuario_Nombre { get; set; }   // Nombre del usuario
        public string Usuario_Apellido { get; set; } // Apellido del usuario
        public int Usuario_Rol { get; set; }         // 1 = Admin, 2 = Empleado
        public string Usuario_Correo { get; set; }   // Correo electrónico
        public string Usuario_Contrasena { get; set; } // Contraseña
        public string Usuario_user { get; set; }     // Nombre de usuario
    }
}
