using System.Security.Cryptography;
using System.Text;
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

        private string GenerateSalt()
        {
            var saltBytes = RandomNumberGenerator.GetBytes(32);
            return Convert.ToBase64String(saltBytes);
        }

        private string HashPassword(string password, string salt)
        {
            using var sha256 = SHA256.Create();

            var combined = password + salt;
            var bytes = Encoding.UTF8.GetBytes(combined);

            var hash = sha256.ComputeHash(bytes);

            return Convert.ToBase64String(hash);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var allUsers = await dbContext.Users.ToListAsync();
            return Ok(allUsers);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserDto addUserDto)
        {
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == addUserDto.Email);

            if (existingUser != null)
                return BadRequest("Email already registered");

            var passwordSalt = GenerateSalt();
            var hashedPassword = HashPassword(addUserDto.Password, passwordSalt);

            var user = new User()
            {
                Email = addUserDto.Email,
                Password = hashedPassword,
                PasswordSalt = passwordSalt,
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

        [HttpDelete]
        [Route("{Id:guid}")]
        public async Task<IActionResult> DeleteUser(Guid Id)
        {
            var user = await dbContext.Users.FindAsync(Id);

            if (user is not null)
            {
                dbContext.Users.Remove(user);
                dbContext.SaveChanges();

                return Ok(user);
            }

            return NotFound();
        }
    }
}
