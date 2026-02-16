using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models.UserDto
{
    public class LoginUserDto
    {
        [EmailAddress][Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}
