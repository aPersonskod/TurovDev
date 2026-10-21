using SiteAttendance.Application.Dtos;

namespace SiteAttendance.Application.Interfaces.Repositories;

public interface IReportRepository
{
    Task AddEntry(AddViewDto addViewDto);
    Task<ReportDto> GetAllEntries();
    Task<ReportDto> GetIntervalEntries(DateTime startDate, DateTime endDate);
}