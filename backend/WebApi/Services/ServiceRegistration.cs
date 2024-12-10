using FluentValidation;
using WebApi.DbOperations;
using WebApi.Helpers;
using WebApi.Repositories.AuthRepository;
using WebApi.Repositories.GeneralRepositories.CommentRepository;
using WebApi.Repositories.GeneralRepositories.FAQRepository;
using WebApi.Repositories.GeneralRepositories.LandingRepositories;
using WebApi.Repositories.TokenRepository;
using WebApi.Repositories.UserRepository;
using WebApi.Services.AuthService;
using WebApi.Services.GeneralServices.CommentService;
using WebApi.Services.GeneralServices.FAQService;
using WebApi.Services.GeneralServices.LandingServices;
using WebApi.Services.TokenService;
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
        services.AddScoped<AuthRepository>();
        services.AddScoped<TokenRepository>();


        //SERVICES
        services.AddScoped<MainTextService>();
        services.AddScoped<ReasonTextService>();
        services.AddScoped<ServicesTextService>();
        services.AddScoped<FAQService>();
        services.AddScoped<UserService>();
        services.AddScoped<PasswordHasher>();
        services.AddScoped<CommentService>();
        services.AddScoped<AuthService>();
        services.AddScoped<JwtTokenService>();

        //SEEDER
        services.AddTransient<DbSeeder>();
    }
}