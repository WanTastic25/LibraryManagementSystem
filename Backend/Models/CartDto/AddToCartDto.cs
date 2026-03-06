namespace LibraryManagementSystem.Models.CartDto
{
    public class AddToCartDto
    {
        public Guid bookId { get; set; }
        public int bookQuantity { get; set; }
    }
}
