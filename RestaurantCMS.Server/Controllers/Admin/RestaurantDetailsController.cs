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
            var details = await _dataContext.RestaurantDetails.FirstOrDefaultAsync();
            return Ok(details);
        }

        [HttpPost("AddRestaurantDetails",Name = "AddRestaurantDetails"), Authorize]
        public async Task<IActionResult> AddRestaurantDetails(RestaurantDetails details)
        {
            details.CreatedAt = DateTime.UtcNow;
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

            existingDetails.Name = details.Name ?? existingDetails.Name;
            existingDetails.PhoneNumber = details.PhoneNumber ?? existingDetails.PhoneNumber;
            existingDetails.ZipCode = details.ZipCode ?? existingDetails.ZipCode;
            existingDetails.City = details.City ?? existingDetails.City;
            existingDetails.Steet = details.Steet ?? existingDetails.Steet;
            existingDetails.HomeNumber = details.HomeNumber ?? existingDetails.HomeNumber;
            existingDetails.OpeningHours = details.OpeningHours ?? existingDetails.OpeningHours;

            _dataContext.RestaurantDetails.Update(existingDetails);
            await _dataContext.SaveChangesAsync();
            return Ok(existingDetails);
        }
    }

}