using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models.BorrowedBookDto;
using LibraryManagementSystem.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowedBookController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public BorrowedBookController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBorrowedBooks()
        {
            var allBorrowedBooks = await dbContext.BorrowedBooks.ToListAsync();
            return Ok(allBorrowedBooks);
        }

        [HttpPost]
        public async Task<IActionResult> AddBorrowedBook(AddBorrowedBookDto addBorrowedBookDto)
        {
            var memberId = await dbContext.Users.FindAsync(addBorrowedBookDto.MemberId);
            if (memberId == null)
                return NotFound(memberId);

            var librarianId = await dbContext.Users.FindAsync(addBorrowedBookDto.LibrarianId);
            if (librarianId == null)
                return NotFound(librarianId);

            var book = await dbContext.Books.FindAsync(addBorrowedBookDto.BookId);
            if (book == null)
                return NotFound(book);

            if (book.Copies <= 0)
                return BadRequest("Book has no available copies");

            book.Copies--;

            var borrowedBook = new BorrowedBook()
            {
                MemberId = addBorrowedBookDto.MemberId,
                LibrarianId = addBorrowedBookDto.LibrarianId,
                BookId = addBorrowedBookDto.BookId,
                ReturnDate = addBorrowedBookDto.ReturnDate,
                BorrowDate = addBorrowedBookDto.BorrowDate,
                IsOverdue = false
            };

            await dbContext.BorrowedBooks.AddAsync(borrowedBook);
            await dbContext.SaveChangesAsync();

            return Ok(borrowedBook);
        }

        [HttpDelete]
        [Route("{BorrowId:guid}")]
        public async Task<IActionResult> returnBorrowedBook(Guid BorrowId)
        {
            var borrowLog = await dbContext.BorrowedBooks.FindAsync(BorrowId);
            if (borrowLog == null)
                return NotFound("Borrow Log not found");

            var book = await dbContext.Books.FindAsync(borrowLog.BookId);
            if (book == null)
                return NotFound("Book not found");

            book.Copies++;

            dbContext.BorrowedBooks.Remove(borrowLog);
            dbContext.SaveChanges();

            return Ok("Delete Success");
        }
    }
}
