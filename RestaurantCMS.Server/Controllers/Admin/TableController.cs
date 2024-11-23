using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;

namespace RestaurantCMS.Server.Controllers.LoggedUser
{
    [ApiController]
    [Route("administrator/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class TableController : ControllerBase
    {
        private readonly ILogger<TableController> _logger;
        private readonly DataContext _dataContext;

        public TableController(ILogger<TableController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllTables",Name = "GetAllTables"), Authorize]
        public async Task<IActionResult> GetAllTables()
        {
            var tables = await _dataContext.Tables.ToListAsync();

            if (tables == null)
            {
                return NotFound();
            }

            return Ok(tables);
        }

        [HttpPost("AddTable", Name = "AddTable"), Authorize]
        public async Task<IActionResult> AddTable(AddTable addtable)
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

            var table = new Table()
            {
                MaximumNumberOfPeople = addtable.MaximumNumberOfPeople
            };

            await _dataContext.Tables.AddAsync(table);
            await _dataContext.SaveChangesAsync();

            return Ok(table);
        }
    }
}
