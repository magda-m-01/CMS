using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantCMS.Database.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservation_AspNetUsers_UserId",
                table: "TableReservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TableReservation",
                table: "TableReservation");

            migrationBuilder.RenameTable(
                name: "TableReservation",
                newName: "TableReservations");

            migrationBuilder.RenameColumn(
                name: "ReservationDate",
                table: "TableReservations",
                newName: "StartTimeOfReservation");

            migrationBuilder.RenameIndex(
                name: "IX_TableReservation_UserId",
                table: "TableReservations",
                newName: "IX_TableReservations_UserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTimeOfReservation",
                table: "TableReservations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_TableReservations",
                table: "TableReservations",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ClientOpinions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientOpinions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientOpinions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FoodCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HomeGallery",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhotoPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeGallery", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HomeWelcomeSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeWelcomeSections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RestaurantDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ZipCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Steet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OpeningHours = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RestaurantStaff",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantStaff", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SocialMedia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LogoPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialMedia", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaximumNumberOfPeople = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dishes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Recipe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDishOfDay = table.Column<bool>(type: "bit", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dishes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dishes_FoodCategory_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "FoodCategory",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientOpinions_UserId",
                table: "ClientOpinions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_CategoryId",
                table: "Dishes",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_AspNetUsers_UserId",
                table: "TableReservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_AspNetUsers_UserId",
                table: "TableReservations");

            migrationBuilder.DropTable(
                name: "ClientOpinions");

            migrationBuilder.DropTable(
                name: "Dishes");

            migrationBuilder.DropTable(
                name: "HomeGallery");

            migrationBuilder.DropTable(
                name: "HomeWelcomeSections");

            migrationBuilder.DropTable(
                name: "RestaurantDetails");

            migrationBuilder.DropTable(
                name: "RestaurantStaff");

            migrationBuilder.DropTable(
                name: "SocialMedia");

            migrationBuilder.DropTable(
                name: "Tables");

            migrationBuilder.DropTable(
                name: "FoodCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TableReservations",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "EndTimeOfReservation",
                table: "TableReservations");

            migrationBuilder.RenameTable(
                name: "TableReservations",
                newName: "TableReservation");

            migrationBuilder.RenameColumn(
                name: "StartTimeOfReservation",
                table: "TableReservation",
                newName: "ReservationDate");

            migrationBuilder.RenameIndex(
                name: "IX_TableReservations_UserId",
                table: "TableReservation",
                newName: "IX_TableReservation_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TableReservation",
                table: "TableReservation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservation_AspNetUsers_UserId",
                table: "TableReservation",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
