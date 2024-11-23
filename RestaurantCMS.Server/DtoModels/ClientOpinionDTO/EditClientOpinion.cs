using Microsoft.AspNetCore.Identity;

namespace RestaurantCMS.Server.DtoModels.ClientOpinionDTO
{
    public class EditClientOpinion
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public IdentityUser? User { get; set; }
    }
}