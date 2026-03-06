using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LibraryManagementSystem.Models.Entities
{
    public class CartItem
    {
        [Key] public Guid cartItemId { get; set; }
        public Guid cartId { get; set; }
        [JsonIgnore] public Cart Cart { get; set; }
        public Guid bookId { get; set; }
        public int bookQuantity { get; set; }
        public Book Book { get; set; }
    }
}