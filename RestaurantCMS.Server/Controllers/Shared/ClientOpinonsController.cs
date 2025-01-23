using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCMS.Database;
using RestaurantCMS.Database.Models;
using RestaurantCMS.Server.DtoModels;
using RestaurantCMS.Server.DtoModels.ClientOpinionDTO;

namespace RestaurantCMS.Server.Controllers.Shared
{
    [ApiController]
    [Route("[controller]")]
    public class ClientOpinionsController : ControllerBase
    {
        private readonly ILogger<ClientOpinionsController> _logger;
        private readonly DataContext _dataContext;

        public ClientOpinionsController(ILogger<ClientOpinionsController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet("GetAllClientOpinions", Name = "GetAllClientOpinions")]
        public async Task<IActionResult> GetAllClientOpinionsAdmin()
        {
            var dishes = await _dataContext.ClientOpinions.Include(d => d.User).ToListAsync();
            

            foreach(var dish in dishes)
            {
                dish.User.PasswordHash = null;
                dish.User.PhoneNumber = null;
                dish.User.SecurityStamp = null;
            }
            return Ok(dishes);
        }
    }

}