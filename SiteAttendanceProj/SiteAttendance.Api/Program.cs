using SiteAttendance.Api.Apis;
using SiteAttendance.Api.Extensions;
using SiteAttendance.Application;
using SiteAttendance.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDefaultServices();
builder.Services.AddAttendanceInfrastructure(builder.Configuration, builder.Environment);
builder.Services.AddAttendanceApplication();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultApi();
app.MapAttendanceEndpoints();
await app.ConfigureDbContext();

app.Run();