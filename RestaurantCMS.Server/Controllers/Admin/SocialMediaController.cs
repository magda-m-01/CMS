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
    public class SocialMediaController : ControllerBase
    {
        private readonly ILogger<SocialMediaController> _logger;
        private readonly DataContext _dataContext;

        public SocialMediaController(ILogger<SocialMediaController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllSocialMedia", Name = "GetAllSocialMedia"), Authorize]
        public async Task<IActionResult> GetAllSocialMedia()
        {
            var socialMedia = await _dataContext.SocialMedia.ToListAsync();

            if (socialMedia == null)
            {
                return NotFound();
            }

            return Ok(socialMedia);
        }

        [HttpPost("AddSocialMedia", Name = "AddSocialMedia"), Authorize]
        public async Task<IActionResult> AddSocialMedia(SocialMedia addSocialMedia)
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

            await _dataContext.SocialMedia.AddAsync(addSocialMedia);
            await _dataContext.SaveChangesAsync();

            return Ok(addSocialMedia);
        }
        [HttpDelete("DeleteSocialMedia", Name = "DeleteSocialMedia"), Authorize]
        public async Task<IActionResult> DeleteSocialMedia(int id)
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

            var restaurantStaff = await _dataContext.SocialMedia.FirstOrDefaultAsync(rs => rs.Id == id);

            if (restaurantStaff == null)
            {
                return NotFound($"No restaurant staff found with ID {id}");
            }

            _dataContext.SocialMedia.Remove(restaurantStaff);
            await _dataContext.SaveChangesAsync();

            return Ok($"Restaurant staff with ID {id} has been deleted");
        }

        [HttpPut("EditSocialMedia", Name = "EditSocialMedia"), Authorize]
        public async Task<IActionResult> EditSocialMedia(SocialMedia socialMedia)
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

            var socialMediaRecord = await _dataContext.SocialMedia.FirstOrDefaultAsync(rs => rs.Id == socialMedia.Id);

            if (socialMediaRecord == null)
            {
                return NotFound($"No social media with ID {socialMedia.Id}");
            }
            if (string.IsNullOrEmpty(socialMedia.Url) || string.IsNullOrEmpty(socialMedia.LogoPath))
            {
                return BadRequest("Musisz podać url i logopath!");
            }

            socialMediaRecord.LogoPath = socialMedia.LogoPath;
            socialMediaRecord.Url = socialMedia.Url;

            _dataContext.SocialMedia.Update(socialMediaRecord);
            await _dataContext.SaveChangesAsync();

            return Ok(socialMediaRecord);
        }
    }
}
