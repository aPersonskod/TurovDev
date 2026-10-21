using Microsoft.AspNetCore.Mvc;
using SiteAttendance.Application.Dtos;
using SiteAttendance.Application.Interfaces.Services;

namespace SiteAttendance.Api.Apis;

public static class AttendanceApi
{
    public static IEndpointRouteBuilder MapAttendanceEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api/attendance-report").WithTags("AttendanceApi");

        api.MapPost("/add-view", async (IReportService reportService, [FromBody] AddViewDto addViewDto) =>
            {
                await reportService.AddEntry(addViewDto);
                return Results.Ok();
            })
            .WithDescription("Add new view")
            .WithName("AddView")
            .WithOpenApi();

        api.MapGet("/get-whole-report", async (IReportService reportService)
                => Results.Ok(await reportService.GetAllEntries()))
            .WithDescription("Get all views")
            .WithName("GetAllViews")
            .WithOpenApi();

        api.MapGet("/get-month-report", async (IReportService reportService)
                => Results.Ok(await reportService.GetMonthEntries()))
            .WithDescription("Get last month views")
            .WithName("GetMonthViews")
            .WithOpenApi();

        api.MapGet("/get-interval-report", async (IReportService reportService,
                    [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
                => Results.Ok(await reportService.GetIntervalEntries(startDate, endDate)))
            .WithDescription("Get interval views")
            .WithName("GetIntervalViews")
            .WithOpenApi();

        return app;
    }
}