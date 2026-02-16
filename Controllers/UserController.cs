using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Models.BookDto;
using LibraryManagementSystem.Models.Entities;
using LibraryManagementSystem.Models.UserDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var allUsers = await dbContext.Users.ToListAsync();
            return Ok(allUsers);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUser(AddUserDto addUserDto)
        {
            var user = new User()
            {
                Email = addUserDto.Email,
                Password = addUserDto.Password,
                Name = addUserDto.Name,
                Role = addUserDto.Role,
                Warning = false,
            };

            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut]
        [Route("{Id:guid}")]
        public async Task<IActionResult> UpdateUser(Guid Id, UpdateUserDto updateUserDto)
        {
            var user = await dbContext.Users.FindAsync(Id);

            if (user is not null)
            {
                user.Email = updateUserDto.Email;
                user.Name = updateUserDto.Name;
                user.Password = updateUserDto.Password;
                user.Role = updateUserDto.Role;

                await dbContext.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
