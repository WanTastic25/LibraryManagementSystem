using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LibraryManagementSystem.Models.Entities
{
    public class Book
    {
        [Key] public Guid bookId { get; set; }
        public required string ISBN { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required int Copies { get; set; }
        public string? Synopsis { get; set; }
        public string? ImageUrl { get; set; }
        [JsonIgnore] public ICollection<BorrowedBook>? BorrowedBooks { get; set; }
    }
}
