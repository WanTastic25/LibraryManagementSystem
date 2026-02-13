using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models.Entities
{
    public class Book
    {
        [Key] public Guid bookId { get; set; }
        public required string ISBN { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required int Copies { get; set; }
        public ICollection<BorrowedBook>? BorrowedBooks { get; set; }
    }
}
