using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Models.Entities;
using LibraryManagementSystem.Models.BookDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public BookController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var allBooks = await dbContext.Books.ToListAsync();
            return Ok(allBooks);
        }

        [HttpGet("catalogue")]
        public async Task<ActionResult<IEnumerable<MemberBookCatalogueDto>>> GetCatalogueBooks()
        {
            var books = await dbContext.Books
                .Select(b => new MemberBookCatalogueDto
                {
                    ISBN = b.ISBN,
                    Title = b.Title,
                    Author = b.Author
                })
        .ToListAsync();

            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(AddBookDto addBookDto)
        {
            var book = new Book()
            {
                ISBN = addBookDto.ISBN,
                Title = addBookDto.Title,
                Author = addBookDto.Author,
                Copies = addBookDto.Copies,
            };

            await dbContext.Books.AddAsync(book);
            await dbContext.SaveChangesAsync();

            return Ok(book);
        }

        [HttpPut]
        [Route("{bookId:guid}")]
        public async Task<IActionResult> UpdateBook(Guid bookId, UpdateBookDto updateBookDto)
        {
            var book = await dbContext.Books.FindAsync(bookId);

            if (book is not null)
            {
                book.ISBN = updateBookDto.ISBN;
                book.Title = updateBookDto.Title;
                book.Author = updateBookDto.Author;
                book.Copies = updateBookDto.Copies;

                await dbContext.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpDelete]
        [Route("{bookId:guid}")]
        public async Task<IActionResult> DeleteHero(Guid bookId)
        {
            var book = await dbContext.Books.FindAsync(bookId);

            if (book is not null)
            {
                dbContext.Books.Remove(book);
                dbContext.SaveChanges();

                return Ok("Delete Success");
            }

            return NotFound();
        }
    }
}
