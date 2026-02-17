using API_Prueba.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace API_Prueba.Data
{
    public class ProductoRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public ProductoRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        // 🔹 OBTENER PRODUCTOS
        public List<Producto> ObtenerProductos()
        {
            var productos = new List<Producto>();

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SP_ObtenerProductos", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        productos.Add(new Producto
                        {
                            Producto_id = Convert.ToInt32(reader["Producto_id"]),
                            Producto_Nombre = reader["Producto_Nombre"].ToString(),
                            Producto_Precio = Convert.ToDecimal(reader["Producto_Precio"]),
                            Producto_Cantidad = Convert.ToInt32(reader["Producto_Cantidad"]),
                            Producto_Descripcion = reader["Producto_Descripcion"].ToString(),
                            Producto_Categoria = Convert.ToInt32(reader["Producto_Categoria"]),
                            Categoria = reader["Categoria"].ToString(),
                            Producto_Responsable = reader["Producto_Responsable"] == DBNull.Value
                                ? null
                                : Convert.ToInt32(reader["Producto_Responsable"]),
                            Responsable = reader["Responsable"].ToString()
                        });
                    }
                }
            }

            return productos;
        }

        // 🔹 CREAR PRODUCTO
        public int CrearProducto(Producto producto)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SP_Productos_CRUD", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Accion", "CREATE");
                command.Parameters.AddWithValue("@Producto_Nombre", producto.Producto_Nombre);
                command.Parameters.AddWithValue("@Producto_Precio", producto.Producto_Precio);
                command.Parameters.AddWithValue("@Producto_Cantidad", producto.Producto_Cantidad);
                command.Parameters.AddWithValue("@Producto_Descripcion", producto.Producto_Descripcion);
                command.Parameters.AddWithValue("@Producto_Categoria", producto.Producto_Categoria);
                command.Parameters.AddWithValue("@Producto_Responsable",
                    (object?)producto.Producto_Responsable ?? DBNull.Value);

                connection.Open();
                var nuevoId = Convert.ToInt32(command.ExecuteScalar());

                return nuevoId;
            }
        }

        // 🔹 ACTUALIZAR PRODUCTO
        public bool ActualizarProducto(Producto producto)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SP_Productos_CRUD", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Accion", "UPDATE");
                command.Parameters.AddWithValue("@Producto_id", producto.Producto_id);
                command.Parameters.AddWithValue("@Producto_Nombre", producto.Producto_Nombre);
                command.Parameters.AddWithValue("@Producto_Precio", producto.Producto_Precio);
                command.Parameters.AddWithValue("@Producto_Cantidad", producto.Producto_Cantidad);
                command.Parameters.AddWithValue("@Producto_Descripcion", producto.Producto_Descripcion);
                command.Parameters.AddWithValue("@Producto_Categoria", producto.Producto_Categoria);
                command.Parameters.AddWithValue("@Producto_Responsable",
                    (object?)producto.Producto_Responsable ?? DBNull.Value);

                connection.Open();
                var result = command.ExecuteScalar();

                return result != null;
            }
        }

        // 🔹 ELIMINAR PRODUCTO
        public bool EliminarProducto(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SP_Productos_CRUD", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Accion", "DELETE");
                command.Parameters.AddWithValue("@Producto_id", id);

                connection.Open();
                var result = command.ExecuteScalar();

                return result != null;
            }
        }

        // 🔹 Obtener categorías
        public List<Categoria> ObtenerCategorias()
        {
            var categorias = new List<Categoria>();

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SELECT Categoria_id, Categoria_Descripcion FROM Categorias", connection))
            {
                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        categorias.Add(new Categoria
                        {
                            Categoria_id = Convert.ToInt32(reader["Categoria_id"]),
                            Categoria_Descripcion = reader["Categoria_Descripcion"].ToString()
                        });
                    }
                }
            }

            return categorias;
        }

        // 🔹 Crear categoría
        public int CrearCategoria(string descripcion)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("SP_Categorias_CRUD", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Accion", "CREATE");
                command.Parameters.AddWithValue("@Categoria_Descripcion", descripcion);

                connection.Open();
                return Convert.ToInt32(command.ExecuteScalar());
            }
        }


    }
}
