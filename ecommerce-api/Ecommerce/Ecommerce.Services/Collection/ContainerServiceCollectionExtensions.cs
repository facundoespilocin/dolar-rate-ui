using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ecommerce.DataAccessLayer.Factory;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.DataAccessLayer.Repositories;
using Ecommerce.Services.Interfaces;
using Ecommerce.Utils.EmailService;

namespace Ecommerce.Services.Collection
{
    public static class ContainerServiceCollectionExtensions
    {
        public static void AddConfigureContainerExtensions(this IServiceCollection services, IConfiguration _configuration)
        {
            // Configuration
            services.AddSingleton(provider => (IConfigurationRoot)_configuration);

            // Factories
            services.AddTransient<IConnectionFactory, ConnectionFactory>();

            // Services
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IMiscService, MiscService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IProductsService, ProductsService>();

            // Repositories
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IMiscRepository, MiscRepository>();
            services.AddTransient<IProductsRepository, ProductsRepository>();
        }
    }
}