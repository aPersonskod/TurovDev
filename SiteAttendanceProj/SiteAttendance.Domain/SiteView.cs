namespace SiteAttendance.Domain;

public class SiteView
{
    public Guid Id { get; set; }
    public Guid RecommenderId { get; set; }
    public DateTime Date { get; set; }
}