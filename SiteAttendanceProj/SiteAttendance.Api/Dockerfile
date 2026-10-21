FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SiteAttendance.Api/SiteAttendance.Api.csproj", "SiteAttendance.Api/"]
COPY ["SiteAttendance.Application/SiteAttendance.Application.csproj", "SiteAttendance.Application/"]
COPY ["SiteAttendance.Domain/SiteAttendance.Domain.csproj", "SiteAttendance.Domain/"]
COPY ["SiteAttendance.Infrastructure/SiteAttendance.Infrastructure.csproj", "SiteAttendance.Infrastructure/"]
RUN dotnet restore "SiteAttendance.Api/SiteAttendance.Api.csproj"
COPY . .
WORKDIR "/src/SiteAttendance.Api"
RUN dotnet build "SiteAttendance.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "SiteAttendance.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SiteAttendance.Api.dll"]
