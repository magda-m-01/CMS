﻿namespace RestaurantCMS.Server.DtoModels
{
    public class AddTableReservation
    {
        public DateTime StartTimeOfReservation { get; set; }
        public DateTime EndTimeOfReservation { get; set; }
        public int NumberOfPeople { get; set; }
    }
}
