using Microsoft.EntityFrameworkCore;
using SiteAttendance.Domain;

namespace SiteAttendance.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Recommender> Recommenders { get; set; }
    public DbSet<SiteView> SiteViews { get; set; }
}