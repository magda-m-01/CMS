using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]"), Authorize]
    public class HomeWelcomeSectionController : ControllerBase
    {
        private readonly ILogger<HomeWelcomeSectionController> _logger;
        private readonly DataContext _dataContext;
        public HomeWelcomeSectionController(ILogger<HomeWelcomeSectionController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetHomeWelcomeSectionsPage", Name = "GetHomeWelcomeSectionsPage"), Authorize]
        public async Task<IActionResult> GetHomeWelcomeSectionsPage()
        {
            var homeGalleries = await _dataContext.HomeWelcomeSections.ToListAsync();

            if (homeGalleries == null)
            {
                return NotFound();
            }

            return Ok(homeGalleries);
        }

    }
}