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

        [HttpGet("GetAllTables", Name = "GetAllTables"), Authorize]
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

            if (addtable.MaximumNumberOfPeople == null || addtable.MaximumNumberOfPeople <= 0)
            {
                return BadRequest("Nie możesz ustawić maksymalnej ilości ludzi na nic");
            }

            var table = new Table()
            {
                MaximumNumberOfPeople = addtable.MaximumNumberOfPeople
            };

            await _dataContext.Tables.AddAsync(table);
            await _dataContext.SaveChangesAsync();

            return Ok(table);
        }
        [HttpDelete("DeleteTable", Name = "DeleteTable"), Authorize]
        public async Task<IActionResult> DeleteTable(int id)
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

            var table = await _dataContext.Tables.FirstOrDefaultAsync(rs => rs.Id == id);

            if (table == null)
            {
                return NotFound($"No table staff found with ID {id}");
            }

            _dataContext.Tables.Remove(table);
            await _dataContext.SaveChangesAsync();

            return Ok($"Table with ID {id} has been deleted");
        }

        [HttpPut("EditTable", Name = "EditTable"), Authorize]
        public async Task<IActionResult> EditTable(Table table)
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

            var tableToEdit = await _dataContext.Tables.FirstOrDefaultAsync(rs => rs.Id == table.Id);

            if (tableToEdit == null)
            {
                return NotFound($"No restaurant staff found with ID {table.Id}");
            }

            if (table.MaximumNumberOfPeople == null || table.MaximumNumberOfPeople <= 0)
            {
                return NotFound($"Niepoprawny format maksymalnej liczby osób przy stoliku!");
            }

            tableToEdit.MaximumNumberOfPeople = table.MaximumNumberOfPeople;

            _dataContext.Tables.Update(tableToEdit);
            await _dataContext.SaveChangesAsync();

            return Ok(tableToEdit);
        }
    }
}
