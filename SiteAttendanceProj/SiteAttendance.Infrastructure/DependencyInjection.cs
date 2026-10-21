using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SiteAttendance.Application.Interfaces.Repositories;
using SiteAttendance.Infrastructure.Data;
using SiteAttendance.Infrastructure.Repositories;

namespace SiteAttendance.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddAttendanceInfrastructure(this IServiceCollection services,
        IConfiguration configuration, IWebHostEnvironment environment)
    {
        var dbConnString = environment.IsDevelopment() 
            ? configuration.GetConnectionString("PostgresConnectionDev") 
            : configuration.GetConnectionString("PostgresConnection");
        services.AddScoped<IReportRepository, ReportRepository>();
        services.AddDbContext<AppDbContext>(o => o.UseNpgsql(dbConnString));
        return services;
    }
}