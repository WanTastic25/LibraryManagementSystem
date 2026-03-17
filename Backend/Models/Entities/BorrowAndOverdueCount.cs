using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace LibraryManagementSystem.Models.Entities
{
    public class BorowAndOverdueCount
    {
        [Key] Guid CountId { get; set; }
        public int BookCount { get; set; }
        public int OverdueCount { get; set; }
    }
}