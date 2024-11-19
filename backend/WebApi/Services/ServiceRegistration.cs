using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repositories.LandingRepositories;
using WebApi.Repository;
using WebApi.Services.LandingServices;

public static class ServiceRegistration
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        //AUTOMAPPER
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        //REPOSITORIES
        services.AddScoped<IRepository<LandingMainText>, MainTextRepository>();
        services.AddScoped<IRepository<LandingReasonText>, ReasonTextRepository>();

        //SERVICES
        services.AddScoped<MainTextService>();
        services.AddScoped<ReasonTextService>();

        //SEEDER
        services.AddTransient<DbSeeder>();
    }
}