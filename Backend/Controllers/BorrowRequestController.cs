using System.Security.Claims;
using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using LibraryManagementSystem.Helpers;
using LibraryManagementSystem.Models.Dtos.BorrowRequestDto;

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
        public async Task<IActionResult> addBorrowRequest(AddBorrowRequestDto addBorrowRequestDto)
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
    }
}
