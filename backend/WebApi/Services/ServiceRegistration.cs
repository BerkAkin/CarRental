using FluentValidation;
using WebApi.DbOperations;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Repositories.CommentRepository;
using WebApi.Repositories.FAQRepository;
using WebApi.Repositories.LandingRepositories;
using WebApi.Repositories.UserRepository;
using WebApi.Repository;
using WebApi.Services.CommentService;
using WebApi.Services.FAQService;
using WebApi.Services.LandingServices;
using WebApi.Services.UserService;
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
        services.AddScoped<MainTextRepository>();
        services.AddScoped<ReasonTextRepository>();
        services.AddScoped<ServiceTextRepository>();
        services.AddScoped<FAQRepository>();
        services.AddScoped<UserRepository>();
        services.AddScoped<CommentRepository>();

        //SERVICES
        services.AddScoped<MainTextService>();
        services.AddScoped<ReasonTextService>();
        services.AddScoped<ServicesTextService>();
        services.AddScoped<FAQService>();
        services.AddScoped<UserService>();
        services.AddScoped<PasswordHasher>();
        services.AddScoped<CommentService>();


        //SEEDER
        services.AddTransient<DbSeeder>();
    }
}