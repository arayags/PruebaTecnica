namespace API_Prueba.Models
{
    public class CreateProductoDto
    {
        public string Producto_Nombre { get; set; }
        public decimal Producto_Precio { get; set; }
        public int Producto_Cantidad { get; set; }
        public string Producto_Descripcion { get; set; }
        public int Producto_Categoria { get; set; }
        public int? Producto_Responsable { get; set; }
    }
}
