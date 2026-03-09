namespace LibraryManagementSystem.Models.BookDto
{
    public class UpdateBookDto
    {
        public required string ISBN { get; set; }
        public IFormFile? Image { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public string? Synopsis { get; set; }
        public required int Copies { get; set; }
    }
}
