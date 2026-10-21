namespace SiteAttendance.Application.Dtos;

public class ReportDto
{
    public IEnumerable<ReportEntryDto> ReportEntries { get; set; }
    public int TotalViews { get; set; }
    public DateTime StartDate { get; set; }
}