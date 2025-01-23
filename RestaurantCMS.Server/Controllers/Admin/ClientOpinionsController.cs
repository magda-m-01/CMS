using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;
using RestaurantCMS.Server.DtoModels.ClientOpinionDTO;

namespace RestaurantCMS.Server.Controllers.Admin
{
    [ApiController]
    [Route("administrator/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class ClientOpinionsController : ControllerBase
    {
        private readonly ILogger<ClientOpinionsController> _logger;
        private readonly DataContext _dataContext;

        public ClientOpinionsController(ILogger<ClientOpinionsController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllClientOpinionsAdmin", Name = "GetAllClientOpinionsAdmin"), Authorize]
        public async Task<IActionResult> GetAllClientOpinionsAdmin()
        {
            var dishes = await _dataContext.ClientOpinions.Include(d => d.User).ToListAsync();
            return Ok(dishes);
        }

        [HttpPut("EditClientOpinionAdmin", Name = "EditClientOpinionAdmin"), Authorize]
        public async Task<IActionResult> EditClientOpinionAdmin(EditClientOpinion editClientOpinion)
        {
            var userId = User?.Identity?.Name;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var clientOpinion = await _dataContext.ClientOpinions.FirstOrDefaultAsync(rs => rs.Id == editClientOpinion.Id);

            if (clientOpinion == null)
            {
                return NotFound($"No restaurant staff found with ID {editClientOpinion.Id}");
            }

            var editedClientOpinion = new ClientOpinion()
            {
                Id = editClientOpinion.Id,
                Title = editClientOpinion.Title,
                Content = editClientOpinion.Content,
                User = user
            };

            _dataContext.ClientOpinions.Update(editedClientOpinion);
            await _dataContext.SaveChangesAsync();

            return Ok(clientOpinion);
        }

        [HttpDelete("DeleteClientOpinionAdmin", Name = "DeleteClientOpinionAdmin"), Authorize]
        public async Task<IActionResult> DeleteClientOpinionAdmin(int id)
        {
            var clientOpinion = await _dataContext.ClientOpinions.FindAsync(id);
            if (clientOpinion == null)
            {
                return NotFound($"No client opinon found with ID {id}");
            }

            _dataContext.ClientOpinions.Remove(clientOpinion);
            await _dataContext.SaveChangesAsync();
            return Ok($"ClientOpinon with ID {id} has been deleted");
        }

    }

}