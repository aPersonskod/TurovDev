using Microsoft.Extensions.DependencyInjection;
using SiteAttendance.Application.Interfaces.Services;
using SiteAttendance.Application.Services;

namespace SiteAttendance.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddAttendanceApplication(this IServiceCollection services)
    {
        services.AddScoped<IReportService, ReportService>();
        return services;
    }
}