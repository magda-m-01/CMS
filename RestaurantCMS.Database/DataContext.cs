using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RestaurantCMS.Database.Models;

namespace RestaurantCMS.Database
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {

        }
        public DbSet<TableReservation> TableReservations { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<SocialMedia> SocialMedia { get; set; }
        public DbSet<RestaurantDetails> RestaurantDetails { get; set; }
        public DbSet<HomeGallery> HomeGallery { get; set; }
        public DbSet<HomeWelcomeSection> HomeWelcomeSections { get; set; }
        public DbSet<RestaurantStaff> RestaurantStaff { get; set; }
        public DbSet<ClientOpinion> ClientOpinions { get; set; }
        public DbSet<FoodCategory> FoodCategories { get; set; }

    }
}
