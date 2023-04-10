using Ecommerce.Services.Collection;
using Ecommerce.Services.Utils;
using Microsoft.OpenApi.Models;

namespace Ecommerce
{
    public class ApplicationStartup
    {
        private readonly IConfiguration _configuration;

        public ApplicationStartup(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddConfigureContainerExtensions(_configuration);
            services.AddCorsConfigurationExtensions();
            services.AddControllers();
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EcommerceAPI", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EcommerceAPI v1"));
            }

            app.AddCorsConfigurationExtensions();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}