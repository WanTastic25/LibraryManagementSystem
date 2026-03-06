using System.Security.Claims;
using LibraryManagementSystem.Data;
using LibraryManagementSystem.Models.CartDto;
using LibraryManagementSystem.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public CartController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(AddToCartDto addToCartDto)
        {
            var userId = GetUserId();
            
            var cart = await dbContext.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.userId == userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    cartId = Guid.NewGuid(),
                    userId = userId
                };

                dbContext.Carts.Add(cart);
            }

            var existingItem = await dbContext.CartItems.FirstOrDefaultAsync(i => i.bookId == addToCartDto.bookId);

            if (existingItem != null)
            {
                existingItem.bookQuantity += 1;
            }
            else
            {
                var cartItem = new CartItem
                {
                    cartItemId = Guid.NewGuid(),
                    cartId = cart.cartId,
                    bookId = addToCartDto.bookId,
                    bookQuantity = 1
                };

                cart.CartItems.Add(cartItem);
            }

            await dbContext.SaveChangesAsync();

            return Ok("Book Added to cart");
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserId();

            var cart = await dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Book)
                .FirstOrDefaultAsync(c => c.userId == userId);

            if (cart == null)
                return Ok(new List<CartItem>());

            return Ok(cart.CartItems);
        }

        [HttpDelete]
        [Route("{cartItemId:guid}")]
        public async Task<IActionResult> RemoveItem(Guid cartItemId)
        {
            var item = await dbContext.CartItems.FindAsync(cartItemId);

            if (item == null)
                return NotFound();

            dbContext.CartItems.Remove(item);

            await dbContext.SaveChangesAsync();

            return Ok("Item Removed");
        }
    }
}