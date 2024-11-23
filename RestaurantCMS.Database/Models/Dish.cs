namespace RestaurantCMS.Database.Models
{
    public class Dish
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public bool? IsDishOfDay {  get; set; }
        public FoodCategory? Category { get; set; }
        public DateTime CreatedAt {get; set;}
    }
}