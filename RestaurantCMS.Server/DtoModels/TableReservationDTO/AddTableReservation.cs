using RestaurantCMS.Database.Models;

namespace RestaurantCMS.Server.DtoModels
{
    public class AddTableReservation
    {
        public DateTime StartTimeOfReservation { get; set; }
        public int NumberOfPeople { get; set; }
        public Table? Table { get; set; }
    }
}
