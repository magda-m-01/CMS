using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace RestaurantCMS.Controllers
{
    [ApiController]
    [Route("administrator/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class RolesController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("AssignRole")]
        [Authorize]
        public async Task<IActionResult> AssignRoleToUser([FromBody] RoleAssignmentRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Role))
            {
                return BadRequest("Invalid request payload.");
            }

            // Find the user by email
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return NotFound($"User with email {request.Email} not found.");
            }

            // Ensure the role exists
            if (!await _roleManager.RoleExistsAsync(request.Role))
            {
                return BadRequest($"Role '{request.Role}' does not exist.");
            }

            // Assign the role to the user
            var result = await _userManager.AddToRoleAsync(user, request.Role);
            if (!result.Succeeded)
            {
                return StatusCode(500, $"Failed to assign role '{request.Role}' to user '{request.Email}'.");
            }

            return Ok($"Role '{request.Role}' assigned to user '{request.Email}' successfully.");
        }

        [HttpDelete("DeleteRole")]
        [Authorize]
        public async Task<IActionResult> DeleteRoleFromUser([FromBody] RoleAssignmentRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Role))
            {
                return BadRequest("Invalid request payload.");
            }

            // Find the user by email
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return NotFound($"User with email {request.Email} not found.");
            }

            // Ensure the user is in the role
            if (!await _userManager.IsInRoleAsync(user, request.Role))
            {
                return BadRequest($"User '{request.Email}' is not in role '{request.Role}'.");
            }

            // Remove the role from the user
            var result = await _userManager.RemoveFromRoleAsync(user, request.Role);
            if (!result.Succeeded)
            {
                return StatusCode(500, $"Failed to remove role '{request.Role}' from user '{request.Email}'.");
            }

            return Ok($"Role '{request.Role}' removed from user '{request.Email}' successfully.");
        }
    }

    public class RoleAssignmentRequest
    {
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
