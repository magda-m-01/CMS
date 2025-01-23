using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;
using RestaurantCMS.Server.DtoModels.TableReservationDTO;

namespace RestaurantCMS.Server.Controllers.LoggedUser
{
    [ApiController]
    [Route("authorizeduser/[controller]"), Authorize]
    public class TableReservationController : ControllerBase
    {
        private readonly ILogger<TableReservationController> _logger;
        private readonly DataContext _dataContext;

        public TableReservationController(ILogger<TableReservationController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllTableReservations", Name = "GetTablesResrvations"), Authorize]
        public async Task<IActionResult> GetTablesResrvations()
        {
            var tableReservations = await _dataContext.TableReservations.Include(x => x.Table).ToListAsync();

            if (tableReservations == null)
            {
                return NotFound();
            }

            return Ok(tableReservations);
        }
        [HttpGet("GetAllTableReservationsOfSingleUser", Name = "GetAllTableReservationsOfSingleUser"), Authorize]
        public async Task<IActionResult> GetAllTableReservationsOfSingleUser()
        {
            var userId = User?.Identity?.Name;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userId);

            var tableReservations = await _dataContext.TableReservations.Include(x => x.Table).ToListAsync();

            var usersTabeleReservations = tableReservations.Where(x => x.User == user).ToList();

            if (usersTabeleReservations == null)
            {
                return NotFound();
            }

            return Ok(usersTabeleReservations);
        }

        [HttpPost("AddTableReservation", Name = "AddTableReservation"), Authorize]
        public async Task<IActionResult> AddTableReservation(AddTableReservation addTableReservation)
        {
            var userId = User?.Identity?.Name;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var reservationDate = addTableReservation.StartTimeOfReservation.Date;

            var tables = await _dataContext.Tables.ToListAsync();
            var tableReservations = await _dataContext.TableReservations
                .Where(tr => tr.StartTimeOfReservation.Date == reservationDate)
                .ToListAsync();

            var availableTables = tables
                .Where(t => t.MaximumNumberOfPeople >= addTableReservation.NumberOfPeople &&
                            !tableReservations.Any(tr => tr.Table != null && tr.Table.Id == t.Id))
                .ToList();

            if (!availableTables.Any())
            {
                return BadRequest("No available tables for the specified date and number of people.");
            }

            var selectedTable = availableTables.First();

            var tableReservation = new TableReservation()
            {
                StartTimeOfReservation = reservationDate,
                NumberOfPeople = addTableReservation.NumberOfPeople,
                User = user,
                Table = selectedTable
            };

            await _dataContext.TableReservations.AddAsync(tableReservation);
            await _dataContext.SaveChangesAsync();

            return Created();
        }


        [HttpDelete("DeleteTableReservation", Name = "DeleteTableReservation"), Authorize]
        public async Task<IActionResult> DeleteTableReservation(int id)
        {
            var userId = User?.Identity?.Name;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var tableReservation = await _dataContext.TableReservations
                .Include(x => x.User)
                .FirstOrDefaultAsync(co => co.Id == id);

            if (tableReservation == null)
            {
                return NotFound($"No dish found with ID {id}");
            }

            if (tableReservation.User != user)
            {
                return BadRequest($"It's not your table reservation.");
            }

            _dataContext.TableReservations.Remove(tableReservation);
            await _dataContext.SaveChangesAsync();
            return Ok($"ClientOpinon with ID {id} has been deleted");
        }
        [HttpPost("GetAvailableTablesForDateAndPeople", Name = "GetAvailableTablesForDateAndPeople"), Authorize]
        public async Task<IActionResult> GetAvailableTablesForDateAndPeople([FromBody] GetAvailableTables getAvailableTables)
        {
            var userId = User?.Identity?.Name;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (getAvailableTables.NumberOfPeople == null)
            {
                return BadRequest("You have to pass all data");
            }

            var reservationDate = getAvailableTables.ReservationDate.Date;

            var tables = await _dataContext.Tables.ToListAsync();
            var tableReservations = await _dataContext.TableReservations
                .Where(tr => tr.StartTimeOfReservation.Date == reservationDate)
                .ToListAsync();

            var availableTables = tables
                .Where(t => t.MaximumNumberOfPeople >= getAvailableTables.NumberOfPeople &&
                            !tableReservations.Any(tr => tr.Table != null && tr.Table.Id == t.Id))
                .ToList();

            return Ok(availableTables);
        }

    }
}
