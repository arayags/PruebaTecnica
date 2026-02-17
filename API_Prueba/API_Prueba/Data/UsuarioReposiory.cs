using API_Prueba.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace API_Prueba.Data
{
    public class UsuarioRepository
    {
        private readonly string _connectionString;

        public UsuarioRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // 🔹 Obtener todos los usuarios
        public List<Usuario> ObtenerUsuarios()
        {
            var lista = new List<Usuario>();

            using var connection = new SqlConnection(_connectionString);
            using var command = new SqlCommand("SELECT * FROM Usuarios", connection);

            connection.Open();
            using var reader = command.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new Usuario
                {
                    Usuario_id = Convert.ToInt32(reader["Usuario_id"]),
                    Usuario_Nombre = reader["Usuario_Nombre"].ToString(),
                    Usuario_Apellido = reader["Usuario_Apellido"].ToString(),
                    Usuario_Rol = Convert.ToInt32(reader["Usuario_Rol"]),
                    Usuario_Correo = reader["Usuario_Correo"].ToString(),
                    Usuario_Contrasena = reader["Usuario_Contrasena"].ToString(),
                    Usuario_user = reader["Usuario_user"].ToString()
                });
            }

            return lista;
        }

        // 🔹 Crear usuario
        public int CrearUsuario(Usuario usuario)
        {
            using var connection = new SqlConnection(_connectionString);
            using var command = new SqlCommand("SP_Usuarios_CRUD", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Accion", "CREATE");
            command.Parameters.AddWithValue("@Usuario_Nombre", usuario.Usuario_Nombre);
            command.Parameters.AddWithValue("@Usuario_Apellido", usuario.Usuario_Apellido);
            command.Parameters.AddWithValue("@Usuario_Rol", usuario.Usuario_Rol);
            command.Parameters.AddWithValue("@Usuario_Correo", usuario.Usuario_Correo);
            command.Parameters.AddWithValue("@Usuario_Contrasena", usuario.Usuario_Contrasena);
            command.Parameters.AddWithValue("@Usuario_user", usuario.Usuario_user);

            connection.Open();
            return Convert.ToInt32(command.ExecuteScalar());
        }

        // 🔹 Actualizar usuario
        public void ActualizarUsuario(int id, Usuario usuario)
        {
            using var connection = new SqlConnection(_connectionString);
            using var command = new SqlCommand("SP_Usuarios_CRUD", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Accion", "UPDATE");
            command.Parameters.AddWithValue("@Usuario_id", id);
            command.Parameters.AddWithValue("@Usuario_Nombre", usuario.Usuario_Nombre);
            command.Parameters.AddWithValue("@Usuario_Apellido", usuario.Usuario_Apellido);
            command.Parameters.AddWithValue("@Usuario_Rol", usuario.Usuario_Rol);
            command.Parameters.AddWithValue("@Usuario_Correo", usuario.Usuario_Correo);
            command.Parameters.AddWithValue("@Usuario_Contrasena", usuario.Usuario_Contrasena);
            command.Parameters.AddWithValue("@Usuario_user", usuario.Usuario_user);

            connection.Open();
            command.ExecuteScalar();
        }

        // 🔹 Eliminar usuario
        public void EliminarUsuario(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            using var command = new SqlCommand("SP_Usuarios_CRUD", connection);

            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@Accion", "DELETE");
            command.Parameters.AddWithValue("@Usuario_id", id);

            connection.Open();
            command.ExecuteScalar();
        }

        public dynamic ValidarUsuario(string username, string password)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SELECT * FROM Usuarios WHERE Usuario_user = @user AND Usuario_Contrasena = @pass", connection))
            {
                command.Parameters.AddWithValue("@user", username);
                command.Parameters.AddWithValue("@pass", password);

                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new
                        {
                            Usuario_user = reader["Usuario_user"].ToString(),
                            Usuario_Rol = Convert.ToInt32(reader["Usuario_Rol"])
                        };
                    }
                }
            }

            return null;
        }

    }
}
