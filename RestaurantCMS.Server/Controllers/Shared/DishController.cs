using Microsoft.AspNetCore.Mvc;
using RestaurantCMS.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Server.DtoModels.Dishes;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]")]
    public class DishController : ControllerBase
    {
        private readonly ILogger<DishController> _logger;
        private readonly DataContext _dataContext;
        public DishController(ILogger<DishController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetDishesPage", Name = "GetDishesPage")]
        public async Task<IActionResult> GetDishesPage()
        {
            var dishes = await _dataContext.Dishes.Include(c => c.Category).ToListAsync();

            var groupedDishes = dishes.GroupBy(x => x.Category)
                .ToList();
            var listOfDishesPage = new List<DishesPage>() { }; 
            
            foreach(var group in groupedDishes)
            {
                var dishPage = new DishesPage
                {
                    Categroy = group.Key,
                    ListOfDishes = new()
                };
                foreach(var dish in group)
                {
                    dish.Category = null;
                    dishPage.ListOfDishes.Add(dish);
                }
                listOfDishesPage.Add(dishPage);
            }
            
            if (listOfDishesPage == null)
            {
                return NotFound();
            }

            return Ok(listOfDishesPage);
        }

    }
}