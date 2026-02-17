// API_Prueba/Services/ProductService.cs
using System.Data;
using Microsoft.Data.SqlClient;
using API_Prueba.Models;

namespace API_Prueba.Services
{
    public class ProductService
    {
        private readonly IConfiguration _configuration;

        public ProductService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Producto> GetProductos()
        {
            var products = new List<Producto>();
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("SP_ObtenerProductos", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        products.Add(new Producto
                        {
                            Producto_id = (int)reader["Producto_id"],
                            Producto_Nombre = reader["Producto_Nombre"].ToString(),
                            Producto_Precio = (decimal)reader["Producto_Precio"],
                            Producto_Cantidad = (int)reader["Producto_Cantidad"],
                            Producto_Descripcion = reader["Producto_Descripcion"].ToString(),
                            Producto_Categoria = (int)reader["Producto_Categoria"],
                            Categoria = reader["Categoria"].ToString(),
                            Producto_Responsable = reader["Producto_Responsable"] as int?,
                            Responsable = reader["Responsable"].ToString()
                        });
                    }
                }
            }

            return products;
        }
    }
}
