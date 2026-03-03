using LibraryManagementSystem.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<BorrowedBook> BorrowedBooks { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Borrowed Book
            // Member
            modelBuilder.Entity<BorrowedBook>()
                .HasOne(b => b.Member)
                .WithMany(u => u.BorrowedBooks)
                .HasForeignKey(b => b.MemberId)
                .OnDelete(DeleteBehavior.Restrict);

            // Librarian
            modelBuilder.Entity<BorrowedBook>()
                .HasOne(b => b.Librarian)
                .WithMany()
                .HasForeignKey(b => b.LibrarianId)
                .OnDelete(DeleteBehavior.Restrict);

            // Book
            modelBuilder.Entity<BorrowedBook>()
                .HasOne(b => b.Book)
                .WithMany(book => book.BorrowedBooks)
                .HasForeignKey(b => b.BookId);
        }
    }
}
