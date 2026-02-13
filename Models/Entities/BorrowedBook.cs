using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Models.Entities
{
    public class BorrowedBook
    {
        [ForeignKey(nameof(MemberId))] public User Member { get; set; }
        [ForeignKey(nameof(LibrarianId))] public User Librarian { get; set; }
        [ForeignKey(nameof(BookId))] public Book Book { get; set; }

        [Key] public Guid BorrowId { get; set; }
        public Guid MemberId { get; set; }
        public Guid LibrarianId { get; set; }
        public Guid BookId { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime BorrowDate { get; set; }
        public bool IsOverdue { get; set; }
    }
}
