using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Models.Entities;
using LibraryManagementSystem.Models.BookDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace LibraryManagementSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public BookController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [Authorize(Roles = "Admin, Member")]
        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var allBooks = await dbContext.Books.ToListAsync();
            return Ok(allBooks);
        }

        [HttpGet]
        [Route("{bookId:guid}")]
        public async Task<IActionResult> GetBookById(Guid bookId)
        {
            var book = await dbContext.Books.FindAsync(bookId);

            if (book == null)
                return NotFound();
            else
                return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromForm] AddBookDto addBookDto)
        {
            string? imageUrl = null;

            if (addBookDto.Image != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(addBookDto.Image.FileName);
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/bookCover", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await addBookDto.Image.CopyToAsync(stream);
                }

                imageUrl = "/images/bookCover/" + fileName;
            }

            var book = new Book()
            {
                ISBN = addBookDto.ISBN,
                Title = addBookDto.Title,
                Author = addBookDto.Author,
                Synopsis = addBookDto.Synopsis,
                Copies = addBookDto.Copies,
                ImageUrl = imageUrl,
            };

            await dbContext.Books.AddAsync(book);
            await dbContext.SaveChangesAsync();

            return Ok(book);
        }

        [HttpPut]
        [Route("{bookId:guid}")]
        public async Task<IActionResult> UpdateBook(Guid bookId, [FromForm] UpdateBookDto updateBookDto)
        {
            var book = await dbContext.Books.FindAsync(bookId);

            if (book is not null)
            {
                if (updateBookDto.Image != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(updateBookDto.Image.FileName);
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/bookCover", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await updateBookDto.Image.CopyToAsync(stream);
                    }

                    book.ImageUrl = "/images/bookCover/" + fileName;
                }

                book.ISBN = updateBookDto.ISBN;
                book.Title = updateBookDto.Title;
                book.Author = updateBookDto.Author;
                book.Synopsis = updateBookDto.Synopsis;
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
        public async Task<IActionResult> DeleteBook(Guid bookId)
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
