using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LibraryManagementSystem.Models.Entities
{
    public class User
    {
        [Key] public Guid Id { get; set; }
        [EmailAddress] [Required] public string Email {  get; set; }
        [Required] public string Password { get; set; }
        public string PasswordSalt { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Role { get; set; }
        public bool Warning { get; set; } = false;
        [JsonIgnore] public ICollection<BorrowedBook>? BorrowedBooks { get; set; }
    }
}
