using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using RestaurantCMS.Database.Models;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Server.DtoModels;
using RestaurantCMS.Server.DtoModels.ClientOpinionDTO;

namespace RestaurantCMS.Server.Controllers.AuthorizedUser
{
    [ApiController]
    [Route("authorizeduser/[controller]"), Authorize]
    public class ClientOpinionsController : ControllerBase
    {
        private readonly ILogger<ClientOpinionsController> _logger;
        private readonly DataContext _dataContext;
        public ClientOpinionsController(ILogger<ClientOpinionsController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllClientsOpinions", Name = "GetClientsOpions"), Authorize]
        public async Task<IActionResult> GetClientsOpions()
        {
            var clientsOpions = await _dataContext.ClientOpinions.Include(c => c.User).ToListAsync();

            if (clientsOpions == null)
            {
                return NotFound();
            }

            return Ok(clientsOpions);
        }
        [HttpPost("AddClientOpinion", Name = "AddClientOpinion"), Authorize]
        public async Task<IActionResult> AddClientOpinion(AddClientOpinion addClientOpinion)
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

            if (string.IsNullOrEmpty(addClientOpinion.Content) || string.IsNullOrEmpty(addClientOpinion.Title))
            {
                return BadRequest("Uzupe³nij wszystkie informacje o opinii!");
            }

            var clientOpinion = new ClientOpinion()
            {
                Title = addClientOpinion.Title,
                Content = addClientOpinion.Content,
                User = user
            };

            await _dataContext.ClientOpinions.AddAsync(clientOpinion);
            await _dataContext.SaveChangesAsync();

            return Ok(clientOpinion);
        }
        [HttpPut("EditClientOpinion", Name = "EditClientOpinion"), Authorize]
        public async Task<IActionResult> EditClientOpinion(EditClientOpinion editClientOpinion)
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
            if (string.IsNullOrEmpty(editClientOpinion.Content) || string.IsNullOrEmpty(editClientOpinion.Title))
            {
                return BadRequest("Uzupe³nij wszystkie informacje o opinii");
            }
            var clientOpinion  = await _dataContext.ClientOpinions.FirstOrDefaultAsync(rs => rs.Id == editClientOpinion.Id);

            if (clientOpinion == null)
            {
                return NotFound($"No restaurant staff found with ID {editClientOpinion.Id}");
            }

            if(clientOpinion.User != user)
            {
                return NotFound($"It's not your opinion you twat");
            }

            clientOpinion.Content = editClientOpinion.Content;
            clientOpinion.Title = editClientOpinion.Title;

            _dataContext.ClientOpinions.Update(clientOpinion);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("DeleteClientOpinion", Name = "DeleteClientOpinion"), Authorize]
        public async Task<IActionResult> DeleteClientOpinion(int id)
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

            var clientOpinion = await _dataContext.ClientOpinions
                .Include(x => x.User)
                .FirstOrDefaultAsync(co => co.Id == id);

            if (clientOpinion == null)
            {
                return NotFound($"No dish found with ID {id}");
            }

            if(clientOpinion.User!= user)
            {
                return Unauthorized($"It's not your opinion.");
            }

            _dataContext.ClientOpinions.Remove(clientOpinion);
            await _dataContext.SaveChangesAsync();
            return Ok($"ClientOpinon with ID {id} has been deleted");
        }
    }
}