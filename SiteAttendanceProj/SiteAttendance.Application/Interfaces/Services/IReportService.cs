using SiteAttendance.Application.Dtos;

namespace SiteAttendance.Application.Interfaces.Services;

public interface IReportService
{
    Task AddEntry(AddViewDto addViewDto);
    Task<ReportDto> GetAllEntries();
    Task<ReportDto> GetMonthEntries();
    Task<ReportDto> GetIntervalEntries(DateTime startDate, DateTime endDate);
}