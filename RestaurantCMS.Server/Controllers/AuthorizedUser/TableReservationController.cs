using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;

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

        [HttpGet(Name = "GetTableResrvation"), Authorize]
        public async Task<IActionResult> GetTableReservation()
        {
            var tableReservations = await _dataContext.TableReservations.ToListAsync();

            if (tableReservations == null)
            {
                return NotFound();
            }

            return Ok(tableReservations);
        }

        [HttpPost(Name = "AddTableReservation"), Authorize]
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

            var tableReservation = new TableReservation()
            {
                StartTimeOfReservation = addTableReservation.StartTimeOfReservation,
                EndTimeOfReservation = addTableReservation.EndTimeOfReservation,
                NumberOfPeople = addTableReservation.NumberOfPeople,
                User = user
            };

            await _dataContext.TableReservations.AddAsync(tableReservation);
            await _dataContext.SaveChangesAsync();

            return Ok(tableReservation);
        }
    }
}
