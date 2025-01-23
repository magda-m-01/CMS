using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;

namespace RestaurantCMS.Server.Controllers.Admin
{
    [ApiController]
    [Route("administrator/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class TableReservationController : ControllerBase
    {
        private readonly ILogger<TableReservationController> _logger;
        private readonly DataContext _dataContext;

        public TableReservationController(ILogger<TableReservationController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllTableReservationsAdmin", Name = "GetAllTableReservationsAdmin"), Authorize]
        public async Task<IActionResult> GetAllTableReservationsAdmin()
        {
            var tableReservations = await _dataContext.TableReservations.Include(x => x.Table).ToListAsync();

            if (tableReservations == null)
            {
                return NotFound();
            }

            return Ok(tableReservations);
        }
        [HttpDelete("DeleteTableReservationAdmin", Name = "DeleteTableReservationAdmin"), Authorize]
        public async Task<IActionResult> DeleteTableReservationAdmin(int id)
        {
            var tableReservation = await _dataContext.TableReservations
                .Include(x => x.User)
                .FirstOrDefaultAsync(co => co.Id == id);

            if (tableReservation == null)
            {
                return NotFound($"No table reservation found with ID {id}");
            }

            _dataContext.TableReservations.Remove(tableReservation);
            await _dataContext.SaveChangesAsync();
            return Ok($"Table reservation with ID {id} has been deleted");
        }
    }
}
