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
    public class DishController : ControllerBase
    {
        private readonly ILogger<DishController> _logger;
        private readonly DataContext _dataContext;

        public DishController(ILogger<DishController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllDishes",Name = "GetAllDishes"), Authorize]
        public async Task<IActionResult> GetDishes()
        {
            var dishes = await _dataContext.Dishes.Include(d => d.Category).ToListAsync();
            return Ok(dishes);
        }

        [HttpPost("AddDish", Name = "AddDish"), Authorize]
        public async Task<IActionResult> AddDish(Dish dish)
        {
            dish.CreatedAt = DateTime.UtcNow;

            if (dish == null || dish.Category == null || string.IsNullOrEmpty(dish.Category.Name) || string.IsNullOrEmpty(dish.Name) || dish.Price == null || dish.Price < 0)
            {
                return BadRequest("Muisz przes³aæ wszystkie detale o daniu.");
            }

            var foodCategroy = _dataContext.FoodCategories.FirstOrDefault(x => x.Name == dish.Category.Name);

            if (foodCategroy == null)
            {
                await _dataContext.Dishes.AddAsync(dish);
            }
            else
            {
                dish.Category = foodCategroy;
                await _dataContext.Dishes.AddAsync(dish);
            }
            await _dataContext.SaveChangesAsync();
            return Ok(dish);
        }

        [HttpPut("EditDish", Name ="EditDish"), Authorize]
        public async Task<IActionResult> EditDish(Dish dish)
        {
            var existingDish = await _dataContext.Dishes.FindAsync(dish.Id);
            if (existingDish == null)
            {
                return NotFound($"No dish found with ID {dish.Id}");
            }
            if(string.IsNullOrEmpty(dish.Category.Name))
            {
                return BadRequest("Kategoria nie mo¿ê byæ pusta!");
            }

            var category = await _dataContext.FoodCategories.FirstOrDefaultAsync(x => x.Name == dish.Category.Name);

            existingDish.Name = dish.Name ?? existingDish.Name;
            existingDish.Price = dish.Price ?? existingDish.Price;
            existingDish.IsDishOfDay = dish.IsDishOfDay ?? existingDish.IsDishOfDay;
            existingDish.Ingredients = dish.Ingredients ?? existingDish.Ingredients;
            existingDish.Category = category ?? dish.Category;
            existingDish.CreatedAt = DateTime.UtcNow;

            _dataContext.Dishes.Update(existingDish);
            await _dataContext.SaveChangesAsync();
            return Ok(existingDish);
        }
        [HttpDelete("DeleteDish", Name ="DeleteDish"), Authorize]
        public async Task<IActionResult> DeleteDish(int id)
        {
            var dish = await _dataContext.Dishes.FindAsync(id);
            if (dish == null)
            {
                return NotFound($"No dish found with ID {id}");
            }

            _dataContext.Dishes.Remove(dish);
            await _dataContext.SaveChangesAsync();
            return Ok($"Dish with ID {id} has been deleted");
        }
    }

}