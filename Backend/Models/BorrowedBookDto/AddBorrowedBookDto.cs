namespace LibraryManagementSystem.Models.BorrowedBookDto
{
    public class AddBorrowedBookDto
    {
        public Guid MemberId { get; set; }
        public Guid LibrarianId { get; set; }
        public Guid BookId { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime BorrowDate { get; set; }
        public bool IsOverdue { get; set; } = false;
    }
}
