using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]")]
    public class SocialMediaController : ControllerBase
    {
        private readonly ILogger<SocialMediaController> _logger;
        private readonly DataContext _dataContext;
        public SocialMediaController(ILogger<SocialMediaController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetSocialMedia", Name = "GetSocialMedia")]
        public async Task<IActionResult> GetSocialMedia()
        {
            var socialMedia = await _dataContext.SocialMedia.ToListAsync();

            if (socialMedia == null)
            {
                return NotFound();
            }

            return Ok(socialMedia);
        }

    }
}