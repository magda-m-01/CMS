namespace RestaurantCMS.Database.Models
{
   public class RestaurantDetails
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ZipCode { get; set; }
        public string? City { get; set; }
        public string? Steet { get; set; }
        public string? HomeNumber { get; set; }
        public string? OpeningHours {  get; set; }
        public DateTime CreatedAt {get; set;}
    }
}
