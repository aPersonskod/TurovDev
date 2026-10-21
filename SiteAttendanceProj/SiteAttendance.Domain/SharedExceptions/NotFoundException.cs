namespace SiteAttendance.Domain.SharedExceptions;

public class NotFoundException(string message) : Exception(message);