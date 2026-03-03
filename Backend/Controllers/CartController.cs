using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public CartController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCart()
        {
            // When user adds an item, a cart is created
            

            return Ok();
        }
    }
}