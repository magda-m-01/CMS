namespace RestaurantCMS.Database.Models
{
    public class TableReservation
    {
        public int Id { get; set; }
        public DateTime ReservationDate { get; set; }
        public int UserId { get; set; }

    }
}
