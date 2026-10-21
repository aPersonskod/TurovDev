using Microsoft.EntityFrameworkCore;
using SiteAttendance.Api.Middleware.Error;
using SiteAttendance.Infrastructure.Data;

namespace SiteAttendance.Api.Extensions;

public static class Extensions
{
    public static IServiceCollection AddDefaultServices(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors(o =>
            o.AddPolicy("CorsPolicy", b =>
            {
                b.WithOrigins(
                        "https://turoff.dev",
                        "http://localhost:5173",
                        "https://localhost:5173"
                    )
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();
        return services;
    }

    public static IApplicationBuilder UseDefaultApi(this IApplicationBuilder app)
    {
        //app.UseHttpsRedirection(); //этим занимается nginx
        app.UseCors("CorsPolicy");
        app.UseExceptionHandler();
        return app;
    }

    public static async Task ConfigureDbContext(this IApplicationBuilder app)
    {
        var logger = app.ApplicationServices.GetService<ILogger<Program>>();
        try
        {
            logger?.LogInformation("Start to migrate database...");
            await using var scope = app.ApplicationServices.CreateAsyncScope();
            var appDbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var pendingMigrations = await appDbContext.Database.GetPendingMigrationsAsync();
            if (pendingMigrations.Any())
            {
                logger?.LogInformation("Applying pending migrations...");
                await appDbContext.Database.MigrateAsync();
                logger?.LogInformation("Migrations applied successfully.");
            }
            else
            {
                logger?.LogInformation("No pending migrations found.");
            }
        }
        catch (Exception e)
        {
            logger?.LogError(e, "Error while migrate database...");
        }
    }
}