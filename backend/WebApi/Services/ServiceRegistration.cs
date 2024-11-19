using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repository;

public static class ServiceRegistration
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        //AUTOMAPPER
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        //REPOSITORIES
        services.AddScoped<IRepository<LandingMainText>, LandingMainTextRepository>();

        //SERVICES
        services.AddScoped<LandingMainTextService>();

        //SEEDER
        services.AddTransient<DbSeeder>();
    }
}