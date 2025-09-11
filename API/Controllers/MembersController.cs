using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MembersController(AppDbContext context) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetMembers()
        {
            var users = await context.Users.ToListAsync();
            if (users == null || !users.Any())
            {
                return NotFound("No members found.");
            }
            return Ok(users);
        }
        
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound($"Member with ID {id} not found.");
            }
            return Ok(user);
        }
    }
}
