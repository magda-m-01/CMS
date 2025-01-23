using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;

namespace RestaurantCMS.Server.Controllers.Admin
{
    [ApiController]
    [Route("administrator/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class RestaurantDetailsController : ControllerBase
    {
        private readonly ILogger<RestaurantDetailsController> _logger;
        private readonly DataContext _dataContext;

        public RestaurantDetailsController(ILogger<RestaurantDetailsController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetRestaurantDetails",Name = "GetRestaurantDetails"), Authorize]
        public async Task<IActionResult> GetRestaurantDetails()
        {
            var details = await _dataContext.RestaurantDetails.ToListAsync();
            return Ok(details);
        }

        [HttpPost("AddRestaurantDetails",Name = "AddRestaurantDetails"), Authorize]
        public async Task<IActionResult> AddRestaurantDetails(RestaurantDetails details)
        {
            var restaurantDetailsList = await _dataContext.RestaurantDetails.ToListAsync();

            var isInTable = restaurantDetailsList.Any(x => x.KeyName == details.KeyName);

            if (isInTable)
            {
                return BadRequest("Rekord o tym KeyName ju¿ istenieje!");
            }

            await _dataContext.RestaurantDetails.AddAsync(details);

            await _dataContext.SaveChangesAsync();
            return Ok(details);
        }

        [HttpPut("EditRestaurantDetails", Name ="EditRestaurantDetails"), Authorize]
        public async Task<IActionResult> EditRestaurantDetails(RestaurantDetails details)
        {
            var existingDetails = await _dataContext.RestaurantDetails.FindAsync(details.Id);
            if (existingDetails == null)
            {
                return NotFound($"No details found with ID {details.Id}");
            }

            existingDetails.KeyValue = details.KeyValue ?? existingDetails.KeyValue;
            existingDetails.KeyName = details.KeyName ?? existingDetails.KeyName;

            _dataContext.RestaurantDetails.Update(existingDetails);
            await _dataContext.SaveChangesAsync();
            return Ok(existingDetails);
        }
        [HttpDelete("DeleteRestaurantDetails", Name = "DeleteRestaurantDetails"), Authorize]
        public async Task<IActionResult> DeleteRestaurantDetails(int id)
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

            var restaurantDetails = await _dataContext.RestaurantDetails.FirstOrDefaultAsync(rs => rs.Id == id);

            if (restaurantDetails == null)
            {
                return NotFound($"No restaurant details found with ID {id}");
            }

            _dataContext.RestaurantDetails.Remove(restaurantDetails);
            await _dataContext.SaveChangesAsync();

            return Ok($"Restaurant details with ID {id} has been deleted");
        }
    }

}