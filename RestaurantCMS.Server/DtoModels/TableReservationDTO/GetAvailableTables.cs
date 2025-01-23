namespace RestaurantCMS.Server.DtoModels.TableReservationDTO
{
    public class GetAvailableTables
    {
        public DateTime ReservationDate {get; set;}
        public int? NumberOfPeople { get; set;}
    }
}
