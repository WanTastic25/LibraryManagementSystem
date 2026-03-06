using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LibraryManagementSystem.Models.Entities
{
    public class Cart
    {
        [Key] public Guid cartId { get; set; }
        public Guid userId { get; set; }
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}