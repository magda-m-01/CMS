using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantCMS.Database.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_FoodCategory_CategoryId",
                table: "Dishes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FoodCategory",
                table: "FoodCategory");

            migrationBuilder.DropColumn(
                name: "EndTimeOfReservation",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "Recipe",
                table: "Dishes");

            migrationBuilder.RenameTable(
                name: "FoodCategory",
                newName: "FoodCategories");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "SocialMedia",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "RestaurantStaff",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "RestaurantDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "HomeWelcomeSections",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "HomeGallery",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Dishes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "ClientOpinions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "FoodCategories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_FoodCategories",
                table: "FoodCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_FoodCategories_CategoryId",
                table: "Dishes",
                column: "CategoryId",
                principalTable: "FoodCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_FoodCategories_CategoryId",
                table: "Dishes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FoodCategories",
                table: "FoodCategories");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SocialMedia");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "RestaurantStaff");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "RestaurantDetails");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "HomeWelcomeSections");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "HomeGallery");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "ClientOpinions");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "FoodCategories");

            migrationBuilder.RenameTable(
                name: "FoodCategories",
                newName: "FoodCategory");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTimeOfReservation",
                table: "TableReservations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Recipe",
                table: "Dishes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FoodCategory",
                table: "FoodCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_FoodCategory_CategoryId",
                table: "Dishes",
                column: "CategoryId",
                principalTable: "FoodCategory",
                principalColumn: "Id");
        }
    }
}
