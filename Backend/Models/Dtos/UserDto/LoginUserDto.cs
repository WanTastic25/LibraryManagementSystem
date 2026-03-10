using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models.Dtos.UserDto
{
    public class LoginUserDto
    {
        [EmailAddress][Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}
