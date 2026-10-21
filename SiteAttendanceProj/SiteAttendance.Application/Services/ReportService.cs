using SiteAttendance.Application.Dtos;
using SiteAttendance.Application.Interfaces.Repositories;
using SiteAttendance.Application.Interfaces.Services;

namespace SiteAttendance.Application.Services;

public class ReportService(IReportRepository reportRepository) : IReportService
{
    public async Task AddEntry(AddViewDto addViewDto) => await reportRepository.AddEntry(addViewDto);

    public async Task<ReportDto> GetAllEntries() => await reportRepository.GetAllEntries();

    public async Task<ReportDto> GetMonthEntries()
    {
        var today = DateTime.Today;
        int daysInMonth = DateTime.DaysInMonth(today.Year, today.Month);
        DateTime firstDayOfMonth = new DateTime(today.Year, today.Month, 1).ToUniversalTime();
        DateTime lastDayOfMonth = new DateTime(today.Year, today.Month, daysInMonth).ToUniversalTime();
        return await reportRepository
            .GetIntervalEntries(firstDayOfMonth, lastDayOfMonth);
    }

    public async Task<ReportDto> GetIntervalEntries(DateTime startDate, DateTime endDate)
        => await reportRepository.GetIntervalEntries(startDate, endDate);
}