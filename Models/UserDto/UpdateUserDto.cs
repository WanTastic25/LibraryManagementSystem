using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models.UserDto
{
    public class UpdateUserDto
    {
        [EmailAddress][Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Role { get; set; }
    }
}
