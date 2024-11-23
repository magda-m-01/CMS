using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]"), Authorize]
    public class RestaurantDetailsController : ControllerBase
    {
        private readonly ILogger<RestaurantDetailsController> _logger;
        private readonly DataContext _dataContext;
        public RestaurantDetailsController(ILogger<RestaurantDetailsController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetRestaurantDetailsPage", Name = "GetRestaurantDetailsPage"), Authorize]
        public async Task<IActionResult> GetRestaurantDetailsPage()
        {
            var restaurantDetails = await _dataContext.RestaurantDetails.ToListAsync();

            if (restaurantDetails == null)
            {
                return NotFound();
            }

            return Ok(restaurantDetails);
        }

    }
}