using FluentValidation;
using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Repositories.FAQRepository;
using WebApi.Repositories.LandingRepositories;
using WebApi.Repository;
using WebApi.Services.FAQService;
using WebApi.Services.LandingServices;
using WebApi.Validators.LandingPage.ReasonText;

public static class ServiceRegistration
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        //AUTOMAPPER
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        //VALIDATOR
        services.AddValidatorsFromAssemblyContaining<ReasonAddValidator>();

        //REPOSITORIES
        services.AddScoped<IRepository<LandingMainText>, MainTextRepository>();
        services.AddScoped<IRepository<LandingReasonText>, ReasonTextRepository>();
        services.AddScoped<IRepository<LandingServiceText>, ServiceTextRepository>();
        services.AddScoped<IRepository<FAQText>, FAQRepository>();

        //SERVICES
        services.AddScoped<MainTextService>();
        services.AddScoped<ReasonTextService>();
        services.AddScoped<ServicesTextService>();
        services.AddScoped<FAQService>();

        //SEEDER
        services.AddTransient<DbSeeder>();
    }
}