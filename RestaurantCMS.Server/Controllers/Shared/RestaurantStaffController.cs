using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]"), Authorize]
    public class RestaurantStaffController : ControllerBase
    {
        private readonly ILogger<RestaurantStaffController> _logger;
        private readonly DataContext _dataContext;
        public RestaurantStaffController(ILogger<RestaurantStaffController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetRestaurantStaffPage", Name = "GetRestaurantStaffPage"), Authorize]
        public async Task<IActionResult> GetRestaurantStaffPage()
        {
            var restaurantStaff = await _dataContext.RestaurantStaff.ToListAsync();

            if (restaurantStaff == null)
            {
                return NotFound();
            }

            return Ok(restaurantStaff);
        }

    }
}