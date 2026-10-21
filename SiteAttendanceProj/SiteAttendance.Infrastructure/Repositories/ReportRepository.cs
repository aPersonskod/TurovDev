using Dapper;
using Microsoft.EntityFrameworkCore;
using SiteAttendance.Application.Dtos;
using SiteAttendance.Application.Interfaces.Repositories;
using SiteAttendance.Domain;
using SiteAttendance.Infrastructure.Data;

namespace SiteAttendance.Infrastructure.Repositories;

public class ReportRepository(AppDbContext context) : IReportRepository
{
    public async Task AddEntry(AddViewDto addViewDto)
    {
        var recommender = string.IsNullOrEmpty(addViewDto.Recommender) ? "empty" : addViewDto.Recommender;
        var foundRecommender = await context.Recommenders.AsNoTracking().FirstOrDefaultAsync(x => x.Name == recommender);
        if (foundRecommender == null)
        {
            foundRecommender = new Recommender()
            {
                Id = Guid.NewGuid(),
                Name = recommender
            };
            await context.Recommenders.AddAsync(foundRecommender);
        }
        await context.SiteViews.AddAsync(new SiteView()
        {
            Id = Guid.NewGuid(),
            RecommenderId = foundRecommender.Id,
            Date = DateTime.Now.ToUniversalTime()
        });
        await context.SaveChangesAsync();
    }

    public async Task<ReportDto> GetAllEntries()
    {
        var totalCount = await context.SiteViews.AsNoTracking().CountAsync();
        var firstDate = await context.SiteViews.AsNoTracking().MinAsync(x => x.Date);
        if (totalCount == 0)
            return new ReportDto()
            {
                TotalViews = totalCount,
                ReportEntries = []
            };
        await using var connection = context.Database.GetDbConnection();
        var sql = "SELECT recs.\"Name\" as Recommender, COUNT(*) as ViewsCount FROM public.\"Recommenders\" as recs " +
                  "INNER JOIN public.\"SiteViews\" as views ON recs.\"Id\" = views.\"RecommenderId\" " +
                  "GROUP BY recs.\"Name\"";
        var reportEntries = await connection.QueryAsync<ReportEntryDto>(sql);
        return new ReportDto()
        {
            TotalViews = totalCount,
            StartDate = firstDate,
            ReportEntries = reportEntries
        };
    }

    public async Task<ReportDto> GetIntervalEntries(DateTime startDate, DateTime endDate)
    {
        var formattedStartDate = startDate.ToUniversalTime().Date;
        var formattedEndDate = endDate.Date.ToUniversalTime().AddDays(1).AddTicks(-1);
        var totalCount = await context.SiteViews.AsNoTracking()
            .CountAsync(x => x.Date >= formattedStartDate && x.Date <= formattedEndDate);
        if (totalCount == 0)
            return new ReportDto()
            {
                TotalViews = totalCount,
                ReportEntries = []
            };
        await using var connection = context.Database.GetDbConnection();
        var sql = "SELECT recs.\"Name\"  as Recommender, COUNT(*) as ViewsCount FROM public.\"Recommenders\" as recs " +
                  "INNER JOIN public.\"SiteViews\" as views ON recs.\"Id\" = views.\"RecommenderId\" " +
                  "WHERE views.\"Date\" BETWEEN @StartDate AND @EndDate " +
                  "GROUP BY recs.\"Name\"";
        var reportEntries = await connection.QueryAsync<ReportEntryDto>(sql, new
        {
            StartDate = formattedStartDate,
            EndDate = formattedEndDate
        });
        return new ReportDto()
        {
            TotalViews = totalCount,
            StartDate = startDate,
            ReportEntries = reportEntries
        };
    }
}