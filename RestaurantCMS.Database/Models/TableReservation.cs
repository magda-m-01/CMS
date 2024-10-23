using Microsoft.AspNetCore.Identity;

namespace RestaurantCMS.Database.Models
{
    public class TableReservation
    {
        public int Id { get; set; }
        public DateTime StartTimeOfReservation { get; set; }
        public DateTime EndTimeOfReservation { get; set; }
        public IdentityUser? User { get; set; }
        public int NumberOfPeople { get; set; }
        public Table? Table { get; set; }
    }
}