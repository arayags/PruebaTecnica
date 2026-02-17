namespace API_Prueba.Models
{
    public class Producto
    {
        public int Producto_id { get; set; }              // ID del producto
        public string Producto_Nombre { get; set; }       // Nombre del producto
        public decimal Producto_Precio { get; set; }     // Precio del producto
        public int Producto_Cantidad { get; set; }       // Cantidad disponible
        public string Producto_Descripcion { get; set; } // Descripción del producto
        public int Producto_Categoria { get; set; }      // ID de la categoría
        public string Categoria { get; set; }            // Nombre de la categoría (JOIN)
        public int? Producto_Responsable { get; set; }   // ID del usuario responsable (puede ser null)
        public string Responsable { get; set; }          // Nombre completo del responsable (JOIN)
    }
}
