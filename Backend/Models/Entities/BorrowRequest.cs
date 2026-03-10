using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models.Entities
{
    public class BorrowRequest
    {
        [Key] public Guid requestId { get; set; }
        public Guid bookId { get; set; }
        public Book Book { get; set; }
        public int bookQuantity { get; set; }
        public Guid userId { get; set; }
        public User User { get; set; }
        public string status { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime PickupDate { get; set; }
    }
}
