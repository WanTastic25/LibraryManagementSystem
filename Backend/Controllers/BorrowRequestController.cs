using System.Security.Claims;
using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using LibraryManagementSystem.Helpers;
using LibraryManagementSystem.Models.Dtos.BorrowRequestDto;
using System.Linq;

namespace LibraryManagementSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowRequestController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        private readonly JwtService jwtService;

        public BorrowRequestController(ApplicationDbContext dbContext, JwtService jwtService)
        {
            this.dbContext = dbContext;
            this.jwtService = jwtService;
        }

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        [HttpPost]
        public async Task<IActionResult> AddBorrowRequest(AddBorrowRequestDto addBorrowRequestDto)
        {
            var userId = GetUserId();

            var request = new BorrowRequest()
            {
                bookId = addBorrowRequestDto.bookId,
                bookQuantity = addBorrowRequestDto.bookQuantity,
                userId = userId,
                status = addBorrowRequestDto.status,
                ReturnDate = addBorrowRequestDto.ReturnDate,
                PickupDate = addBorrowRequestDto.PickupDate
            };

            await dbContext.BorrowRequests.AddAsync(request);
            await dbContext.SaveChangesAsync();

            return Ok(request);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBorrowRequest()
        {
            var allBorrowRequests = await dbContext.BorrowRequests
                .Include(br => br.Book)
                .Include(br => br.User)
                .ToListAsync();

            return Ok(allBorrowRequests);
        }

        [HttpPut]
        [Route("{requestId:guid}/approve")]
        public async Task<IActionResult> ApproveBorrowRequest(Guid requestId)
        {
            var borrowRequest = await dbContext.BorrowRequests.FindAsync(requestId);

            if (borrowRequest != null)
            {
                borrowRequest.status = "Approved";
            }
            else
            {
                return NotFound();
            }

            await dbContext.SaveChangesAsync();

            return Ok("Request Approved");
        }

        [HttpPut]
        [Route("{requestId:guid}/reject")]
        public async Task<IActionResult> RejectBorrowRequest(Guid requestId)
        {
            var borrowRequest = await dbContext.BorrowRequests.FindAsync(requestId);

            if (borrowRequest != null)
            {
                borrowRequest.status = "Rejected";
                borrowRequest.RejectedAt = DateTime.UtcNow;
            }
            else
            {
                return NotFound();
            }

            await dbContext.SaveChangesAsync();

            return Ok("Request Rejected");
        }

        [HttpPut]
        [Route("{requestId:guid}/pick-up")]
        public async Task<IActionResult> PickUpBook(Guid requestId)
        {
            var borrowRequest = await dbContext.BorrowRequests.FindAsync(requestId);

            if (borrowRequest != null)
            {
                borrowRequest.status = "Picked Up";
            }
            else
            {
                return NotFound();
            }

            await dbContext.SaveChangesAsync();

            return Ok("Book Passed to Member");
        }

        [HttpGet]
        [Route("your-requests")]
        public async Task<IActionResult> GetPersonalBorrowRequest()
        {
            var userId = GetUserId();

            var personalBorrowRequest = await dbContext.BorrowRequests
                .Include(br => br.Book)
                .Include(br => br.User)
                .Where(br => br.userId == userId)
                .ToListAsync();

            return Ok(personalBorrowRequest);
        }

        [HttpDelete]
        [Route("{requestId:guid}")]
        public async Task<IActionResult> DeleteRequest(Guid requestId)
        {
            var borrowRequest = await dbContext.BorrowRequests.FindAsync(requestId);

            if (borrowRequest != null)
            {
                dbContext.BorrowRequests.Remove(borrowRequest);
                dbContext.SaveChanges();

                return Ok("Delete Success");
            }

            return NotFound();
        }

        [HttpGet]
        [Route("borrow-count")]
        public async Task<IActionResult> BorrowCount()
        {
            int borrowCount = await dbContext.BorrowRequests
            .Where(br => br.status == "Picked Up")
            .CountAsync();

            return Ok(borrowCount);
        }

        [HttpGet]
        [Route("overdue-book-count")]
        public async Task<IActionResult> OverdueBookCount()
        {
            int bookCount = await dbContext.BorrowRequests
            .Where(br => br.status == "Overdue")
            .CountAsync();

            return Ok(bookCount);
        }
    }
}
