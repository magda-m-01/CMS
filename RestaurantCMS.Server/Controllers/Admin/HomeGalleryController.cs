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
    public class HomeGalleryController : ControllerBase
    {
        private readonly ILogger<HomeGalleryController> _logger;
        private readonly DataContext _dataContext;

        public HomeGalleryController(ILogger<HomeGalleryController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllHomeGalleries",Name = "GetAllHomeGalleries"), Authorize]
        public async Task<IActionResult> GetAllHomeGalleries()
        {
            var photos = await _dataContext.HomeGallery.ToListAsync();
            return Ok(photos);
        }

        [HttpPost("AddHomeGallery",Name = "AddHomeGallery"), Authorize]
        public async Task<IActionResult> AddHomeGallery(HomeGallery photo)
        {
            photo.CreatedAt = DateTime.UtcNow;
            await _dataContext.HomeGallery.AddAsync(photo);
            await _dataContext.SaveChangesAsync();
            return Ok(photo);
        }
        [HttpPut("EditHomeGallery", Name = "EditHomeGallery"), Authorize]
        public async Task<IActionResult> EditHomeGallery(HomeGallery photo)
        {
            var existingSection = await _dataContext.HomeGallery.FindAsync(photo.Id);
            if (existingSection == null)
            {
                return NotFound($"No section found with ID {photo.Id}");
            }

            photo.PhotoPath = photo.PhotoPath ?? existingSection.PhotoPath;

            _dataContext.HomeGallery.Update(photo);
            await _dataContext.SaveChangesAsync();
            return Ok(existingSection);
        }

        [HttpDelete("DeleteHomeGallery", Name ="DeleteHomeGallery"), Authorize]
        public async Task<IActionResult> DeleteHomeGallery(int id)
        {
            var photo = await _dataContext.HomeGallery.FindAsync(id);
            if (photo == null)
            {
                return NotFound($"No photo found with ID {id}");
            }

            _dataContext.HomeGallery.Remove(photo);
            await _dataContext.SaveChangesAsync();
            return Ok($"Photo with ID {id} has been deleted");
        }
    }
}