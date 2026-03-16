using System;
using LibraryManagementSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LibraryManagementSystem.Services
{
    public class BorrowRequestCleanupService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public BorrowRequestCleanupService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                
                var expiredRequests = await context.BorrowRequests
                    .Where(r => r.status == "Rejected"
                        && r.RejectedAt != null
                        && r.RejectedAt <= DateTime.UtcNow.AddMinutes(-1))
                    .ToListAsync();

                if (expiredRequests.Any())
                    context.BorrowRequests.RemoveRange(expiredRequests);

                var today = DateOnly.FromDateTime(DateTime.UtcNow);

                var overdueRequests = await context.BorrowRequests
                    .Where(r => r.status == "Picked Up"
                        && r.ReturnDate < today)
                    .ToListAsync();

                foreach (var request in overdueRequests)
                    request.status = "Overdue";
    
                await context.SaveChangesAsync();
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
