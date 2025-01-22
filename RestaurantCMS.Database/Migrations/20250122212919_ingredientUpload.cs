using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantCMS.Database.Migrations
{
    /// <inheritdoc />
    public partial class ingredientUpload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Recipe",
                table: "Dishes",
                newName: "Ingredients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Ingredients",
                table: "Dishes",
                newName: "Recipe");
        }
    }
}
