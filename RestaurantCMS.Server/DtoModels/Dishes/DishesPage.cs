using RestaurantCMS.Database.Models;

namespace RestaurantCMS.Server.DtoModels.Dishes
{
    public class DishesPage
    {
        public FoodCategory? Categroy { get; set; }
        public List<Dish>? ListOfDishes { get; set; }
    }
}
