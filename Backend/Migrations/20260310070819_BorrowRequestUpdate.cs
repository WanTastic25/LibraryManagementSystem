using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class BorrowRequestUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BorrowRequests",
                columns: table => new
                {
                    requestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    bookId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    bookQuantity = table.Column<int>(type: "int", nullable: false),
                    userId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BorrowDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BorrowRequests", x => x.requestId);
                    table.ForeignKey(
                        name: "FK_BorrowRequests_Books_bookId",
                        column: x => x.bookId,
                        principalTable: "Books",
                        principalColumn: "bookId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BorrowRequests_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BorrowRequests_bookId",
                table: "BorrowRequests",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_BorrowRequests_userId",
                table: "BorrowRequests",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BorrowRequests");
        }
    }
}
