namespace LibraryManagementSystem.Models.BookDto
{
    public class AddBookDto
    {
        public required string ISBN { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required int Copies { get; set; }
    }
}
