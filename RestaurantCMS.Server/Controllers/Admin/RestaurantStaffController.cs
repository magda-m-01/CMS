using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;

namespace RestaurantCMS.Server.Controllers.LoggedUser
{
    [ApiController]
    [Route("administrator/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class RestaurantStaffController : ControllerBase
    {
        private readonly ILogger<RestaurantStaffController> _logger;
        private readonly DataContext _dataContext;

        public RestaurantStaffController(ILogger<RestaurantStaffController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllRestaurantStaff", Name = "GetAllRestaurantStaff"), Authorize]
        public async Task<IActionResult> GetAllRestaurantStaff()
        {
            var tables = await _dataContext.RestaurantStaff.ToListAsync();

            if (tables == null)
            {
                return NotFound();
            }

            return Ok(tables);
        }

        [HttpPost("AddRestaurantStaff", Name = "AddRestaurantStaff"), Authorize]
        public async Task<IActionResult> AddRestaurantStaff(AddRestaurantStaff addRestaurantStaff)
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

            if (string.IsNullOrEmpty(addRestaurantStaff.Name))
            {
                return BadRequest("Podaj imie paremtery!");
            }

            var restaurantStaff = new RestaurantStaff()
            {
                Name = addRestaurantStaff.Name,
                Description = addRestaurantStaff.Description,
                CreatedAt = DateTime.UtcNow
            };

            await _dataContext.RestaurantStaff.AddAsync(restaurantStaff);
            await _dataContext.SaveChangesAsync();

            return Ok(restaurantStaff);
        }
        [HttpDelete("DeleteRestaurantStaff", Name = "DeleteRestaurantStaff"), Authorize]
        public async Task<IActionResult> DeleteRestaurantStaff(int id)
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

            var restaurantStaff = await _dataContext.RestaurantStaff.FirstOrDefaultAsync(rs => rs.Id == id);

            if (restaurantStaff == null)
            {
                return NotFound($"No restaurant staff found with ID {id}");
            }

            _dataContext.RestaurantStaff.Remove(restaurantStaff);
            await _dataContext.SaveChangesAsync();

            return Ok($"Restaurant staff with ID {id} has been deleted");
        }

        [HttpPut("EditRestaurantStaff", Name = "EditRestaurantStaff"), Authorize]
        public async Task<IActionResult> EditRestaurantStaff(EditRestaurantStaff editRestaurantStaff)
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

            var restaurantStaff = await _dataContext.RestaurantStaff.FirstOrDefaultAsync(rs => rs.Id == editRestaurantStaff.Id);

            if (restaurantStaff == null)
            {
                return NotFound($"No restaurant staff found with ID {editRestaurantStaff.Id}");
            }

            restaurantStaff.Name = editRestaurantStaff.Name ?? restaurantStaff.Name;
            restaurantStaff.Description = editRestaurantStaff.Description ?? restaurantStaff.Description;
            restaurantStaff.CreatedAt = DateTime.UtcNow;

            _dataContext.RestaurantStaff.Update(restaurantStaff);
            await _dataContext.SaveChangesAsync();

            return Ok(restaurantStaff);
        }
    }
}
