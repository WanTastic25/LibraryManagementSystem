using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models.Entities
{
    public enum RequestType
    {
        POST,
        PUT,
        DELETE
    }

    public enum RequestStatus
    {
        Pending,
        Approved,
        Rejected
    }

    public class BookActionRequest
    {
        [Key] public Guid RequestID { get; set; }

        [Required] public RequestType RequestType { get; set; }

        [ForeignKey(nameof(LibrarianId))] public User Librarian { get; set; }
        public Guid LibrarianId { get; set; }

        [ForeignKey(nameof(BookId))] public Book Book { get; set; }
        public Guid BookId { get; set; }

        [ForeignKey(nameof(AdminId))] public User Admin { get; set; }
        public Guid AdminId { get; set; }

        [Required] public RequestStatus Status { get; set; } = RequestStatus.Pending;

        [Required] public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public string Remarks { get; set; }
    }
}
