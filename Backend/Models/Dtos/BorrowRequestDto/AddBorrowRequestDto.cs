namespace LibraryManagementSystem.Models.Dtos.BorrowRequestDto
{
    public class AddBorrowRequestDto
    {
        public Guid bookId { get; set; }
        public int bookQuantity { get; set; }
        public Guid userId { get; set; }
        public string status { get; set; }
        public DateOnly ReturnDate { get; set; }
        public DateOnly PickupDate { get; set; }
    }
}
