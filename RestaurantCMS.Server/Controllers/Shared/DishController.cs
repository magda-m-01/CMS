using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]"), Authorize]
    public class DishController : ControllerBase
    {
        private readonly ILogger<DishController> _logger;
        private readonly DataContext _dataContext;
        public DishController(ILogger<DishController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetDishesPage", Name = "GetDishesPage"), Authorize]
        public async Task<IActionResult> GetDishesPage()
        {
            var dishes = await _dataContext.Dishes.ToListAsync();

            if (dishes == null)
            {
                return NotFound();
            }

            return Ok(dishes);
        }

    }
}