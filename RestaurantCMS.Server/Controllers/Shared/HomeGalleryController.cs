using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]")]
    public class HomeGalleryController : ControllerBase
    {
        private readonly ILogger<HomeGalleryController> _logger;
        private readonly DataContext _dataContext;
        public HomeGalleryController(ILogger<HomeGalleryController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetHomeGalleriesPage", Name = "GetHomeGalleriesPage")]
        public async Task<IActionResult> GetHomeGalleriesPage()
        {
            var homeGalleries = await _dataContext.HomeGallery.ToListAsync();

            if (homeGalleries == null)
            {
                return NotFound();
            }

            return Ok(homeGalleries);
        }

    }
}