using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models.Entities;
using LibraryManagementSystem.Models.UserDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public AuthController(ApplicationDbContext dbContext)
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

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterMemberDto registerMemberDto)
        {
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == registerMemberDto.Email);

            if (existingUser != null)
                return BadRequest("Email already registered");

            var passwordSalt = GenerateSalt();
            var hashedPassword = HashPassword(registerMemberDto.Password, passwordSalt);

            var user = new User()
            {
                Email = registerMemberDto.Email,
                Password = hashedPassword,
                PasswordSalt = passwordSalt,
                Name = registerMemberDto.Name,
                Role = "Member",
                Warning = false,
            };

            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return Ok(user);
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == loginUserDto.Email);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var hash = HashPassword(loginUserDto.Password, user.PasswordSalt);
            if (hash != user.Password)
                return Unauthorized();

            return Ok(new
            {
                message = "Login successful",
                userId = user.Id,
                username = user.Name
            });
        }

    }
}
