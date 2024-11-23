namespace RestaurantCMS.Database.Models
{
    public class Header
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool? Url { get; set; }
        public int? ParentId { get; set; }
    }
}
