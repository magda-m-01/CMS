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
    public class FoodCategoryController : ControllerBase
    {
        private readonly ILogger<FoodCategoryController> _logger;
        private readonly DataContext _dataContext;

        public FoodCategoryController(ILogger<FoodCategoryController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        
        [HttpGet("GetAllFoodCategories", Name = "GetAllFoodCategories"), Authorize]
        public async Task<IActionResult> GetAllFoodCategories()
        {
            var categories = await _dataContext.FoodCategories.ToListAsync();
            return Ok(categories);
        }

        [HttpPost("AddFoodCategory",Name = "AddFoodCategory"), Authorize]
        public async Task<IActionResult> AddFoodCategory(FoodCategory category)
        {
            category.CreatedAt = DateTime.UtcNow;
            var categories = await _dataContext.FoodCategories.ToListAsync();
            var isExisting = categories.Any(x=> x.Name == category.Name);

            if (isExisting)
            {
                return BadRequest("Kategoria o tej nazwie istnieje!");
            }

            await _dataContext.FoodCategories.AddAsync(category);
            await _dataContext.SaveChangesAsync();
            return Ok(category);
        }

        [HttpPut("EditFoodCategory", Name ="EditFoodCategory"), Authorize]
        public async Task<IActionResult> EditFoodCategory(FoodCategory category)
        {
            var existingCategory = await _dataContext.FoodCategories.FindAsync(category.Id);
            if (existingCategory == null)
            {
                return NotFound($"No category found with ID {category.Id}");
            }

            existingCategory.Name = category.Name ?? existingCategory.Name;

            _dataContext.FoodCategories.Update(existingCategory);
            await _dataContext.SaveChangesAsync();
            return Ok(existingCategory);
        }

        [HttpDelete("DeleteFoodCategory", Name ="DeleteFoodCategory"), Authorize]
        public async Task<IActionResult> DeleteFoodCategory(int id)
        {
            var category = await _dataContext.FoodCategories.FindAsync(id);
            if (category == null)
            {
                return NotFound($"No category found with ID {id}");
            }

            _dataContext.FoodCategories.Remove(category);
            await _dataContext.SaveChangesAsync();
            return Ok($"Category with ID {id} has been deleted");
        }
    }

}