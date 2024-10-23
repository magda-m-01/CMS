using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestaurantCMS.Database.Migrations
{
    /// <inheritdoc />
    public partial class Update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TableId",
                table: "TableReservations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TableReservations_TableId",
                table: "TableReservations",
                column: "TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Tables_TableId",
                table: "TableReservations",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Tables_TableId",
                table: "TableReservations");

            migrationBuilder.DropIndex(
                name: "IX_TableReservations_TableId",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "TableId",
                table: "TableReservations");
        }
    }
}
