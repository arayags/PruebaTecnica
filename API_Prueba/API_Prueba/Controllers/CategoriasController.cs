using API_Prueba.Data;
using API_Prueba.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_Prueba.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ProductoRepository _repository;

        public CategoriasController(ProductoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult ObtenerCategorias()
        {
            return Ok(_repository.ObtenerCategorias());
        }

        [HttpPost]
        public IActionResult CrearCategoria([FromBody] Categoria categoria)
        {
            var nuevoId = _repository.CrearCategoria(categoria.Categoria_Descripcion);
            return Ok(new { id = nuevoId });
        }
    }
}
