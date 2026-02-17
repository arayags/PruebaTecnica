using API_Prueba.Data;
using API_Prueba.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_Prueba.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioRepository _repository;

        public UsuariosController(UsuarioRepository repository)
        {
            _repository = repository;
        }

        // 🔹 GET
        [HttpGet]
        public IActionResult ObtenerUsuarios()
        {
            return Ok(_repository.ObtenerUsuarios());
        }

        [Authorize(Roles = "1")]

        [HttpPost]
        public IActionResult CrearUsuario([FromBody] Usuario usuario)
        {
            if (usuario.Usuario_Rol != 1 && usuario.Usuario_Rol != 2)
                return BadRequest("Rol inválido.");

            var nuevoId = _repository.CrearUsuario(usuario);
            usuario.Usuario_id = nuevoId;

            return Ok(usuario);
        }

        [Authorize(Roles = "1")]

        [HttpPut("{id}")]
        public IActionResult ActualizarUsuario(int id, [FromBody] Usuario usuario)
        {
            _repository.ActualizarUsuario(id, usuario);
            return Ok();
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult EliminarUsuario(int id)
        {
            _repository.EliminarUsuario(id);
            return Ok();
        }
    }
}
