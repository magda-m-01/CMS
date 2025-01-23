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
    public class HomeWelcomeSectionController : ControllerBase
    {
        private readonly ILogger<HomeWelcomeSectionController> _logger;
        private readonly DataContext _dataContext;

        public HomeWelcomeSectionController(ILogger<HomeWelcomeSectionController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetHomeWelcomeSections",Name = "GetHomeWelcomeSections"), Authorize]
        public async Task<IActionResult> GetHomeWelcomeSections()
        {
            var sections = await _dataContext.HomeWelcomeSections.ToListAsync();
            return Ok(sections);
        }

        [HttpPost("AddHomeWelcomeSection",Name = "AddHomeWelcomeSection"), Authorize]
        public async Task<IActionResult> AddHomeWelcomeSection(HomeWelcomeSection section)
        {
            section.CreatedAt = DateTime.UtcNow;

            if (string.IsNullOrEmpty(section.PhotoUrl))
            {
                return BadRequest("Podaj wszystkie paramtery!");
            }

            await _dataContext.HomeWelcomeSections.AddAsync(section);
            await _dataContext.SaveChangesAsync();
            return Ok(section);
        }

        [HttpPut("EditHomeWelcomeSection", Name ="EditHomeWelcomeSection"), Authorize]
        public async Task<IActionResult> EditHomeWelcomeSection(HomeWelcomeSection section)
        {
            var existingSection = await _dataContext.HomeWelcomeSections.FindAsync(section.Id);
            if (existingSection == null)
            {
                return NotFound($"No section found with ID {section.Id}");
            }

            existingSection.PhotoUrl = section.PhotoUrl ?? existingSection.PhotoUrl;
            existingSection.Content = section.Content ?? existingSection.Content;

            _dataContext.HomeWelcomeSections.Update(existingSection);
            await _dataContext.SaveChangesAsync();
            return Ok(existingSection);
        }
        [HttpDelete("DeleteHomeWelcomeSection", Name = "DeleteHomeWelcomeSection"), Authorize]
        public async Task<IActionResult> DeleteHomeWelcomeSection(int id)
        {
            var welcomeSection = await _dataContext.HomeWelcomeSections.FindAsync(id);
            if (welcomeSection == null)
            {
                return NotFound($"No photo found with ID {id}");
            }

            _dataContext.HomeWelcomeSections.Remove(welcomeSection);
            await _dataContext.SaveChangesAsync();
            return Ok($"WelcomeSection with ID {id} has been deleted");
        }
    }

} 