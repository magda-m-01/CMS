using Microsoft.AspNetCore.Identity;

namespace RestaurantCMS.Database.Models
{
    public class ClientOpinion
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public IdentityUser? User { get; set; }
    }
}
