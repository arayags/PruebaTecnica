using API_Prueba.Data;
using API_Prueba.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace API_Prueba.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly ProductoRepository _repository;

        public ProductosController(ProductoRepository repository)
        {
            _repository = repository;
        }

        // 🔹 GET
        [HttpGet]
        public IActionResult ObtenerProductos()
        {
            var productos = _repository.ObtenerProductos();
            return Ok(productos);
        }

        // 🔹 POST
        [HttpPost]
        public IActionResult CrearProducto([FromBody] CreateProductoDto dto)
        {
            var producto = new Producto
            {
                Producto_Nombre = dto.Producto_Nombre,
                Producto_Precio = dto.Producto_Precio,
                Producto_Cantidad = dto.Producto_Cantidad,
                Producto_Descripcion = dto.Producto_Descripcion,
                Producto_Categoria = dto.Producto_Categoria,
                Producto_Responsable = dto.Producto_Responsable
            };

            var nuevoId = _repository.CrearProducto(producto);
            producto.Producto_id = nuevoId;

            return CreatedAtAction(nameof(ObtenerProductos), new { id = nuevoId }, producto);
        }

        // 🔹 PUT
        [HttpPut("{id}")]
        public IActionResult ActualizarProducto(int id, [FromBody] CreateProductoDto dto)
        {
            var producto = new Producto
            {
                Producto_id = id,
                Producto_Nombre = dto.Producto_Nombre,
                Producto_Precio = dto.Producto_Precio,
                Producto_Cantidad = dto.Producto_Cantidad,
                Producto_Descripcion = dto.Producto_Descripcion,
                Producto_Categoria = dto.Producto_Categoria,
                Producto_Responsable = dto.Producto_Responsable
            };

            var actualizado = _repository.ActualizarProducto(producto);

            if (!actualizado)
                return NotFound();

            return NoContent();
        }

        // 🔹 DELETE
        [HttpDelete("{id}")]
        public IActionResult EliminarProducto(int id)
        {
            var eliminado = _repository.EliminarProducto(id);

            if (!eliminado)
                return NotFound();

            return NoContent();
        }
    }
}
