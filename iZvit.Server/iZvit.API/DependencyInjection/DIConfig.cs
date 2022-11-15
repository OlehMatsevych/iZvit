using iZvit.Application.MappingProfiles;
using iZvit.Application.Services;
using iZvit.Application.Services.Contracts;
using iZvit.DataAccess.Persistence;
using iZvit.DataAccess.Repositories;
using iZvit.DataAccess.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace iZvit.API.DependencyInjection
{
    public static class DependencyInjectionConfiguration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IReportService, ReportService>();
        }
        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ReportProfile).Assembly);
        }
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IReportRepository, ReportRepository>();
        }

        public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var databaseConfig = configuration.GetSection("Database").Get<DatabaseConfiguration>();
            services.AddDbContext<Context>(options =>
                options.UseSqlServer(databaseConfig.ConnectionString,
                opt => opt.MigrationsAssembly(typeof(Context).Assembly.FullName)));
        }
    }
}
