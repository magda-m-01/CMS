using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;

namespace RestaurantCMS.Server.Controllers.AuthorizedUser
{
    [ApiController]
    [Route("authorizeduser/[controller]")]
    public class TableController : ControllerBase
    {
        private readonly ILogger<TableController> _logger;
        private readonly DataContext _dataContext;

        public TableController(ILogger<TableController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllTablesForUser", Name = "GetAllTablesForUser"), Authorize]
        public async Task<IActionResult> GetAllTablesForUser()
        {
            var tables = await _dataContext.Tables.ToListAsync();

            if (tables == null)
            {
                return NotFound();
            }

            return Ok(tables);
        }
    }
}
