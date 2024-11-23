namespace RestaurantCMS.Database.Models
{
    public class SocialMedia
    {
        public int Id { get; set; }
        public string? LogoPath { get; set; }
        public string? Url { get; set; }
        public DateTime CreatedAt {get; set;}
    }
}
