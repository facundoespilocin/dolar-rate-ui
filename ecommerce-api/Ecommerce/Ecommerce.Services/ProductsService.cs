using AutoMapper;
using Ecommerce.DataAccessLayer.Entities.Product;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.Services.Interfaces;
using Ecommerce.Utils.EmailService;
using Ecommerce.Utils.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.Services
{
    public class ProductsService : IProductsService
    {
        private readonly IProductsRepository _productsRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public ProductsService(IProductsRepository productsRepository, IOptions<AppSettings> appSettings, IMapper mapper, IEmailService emailService)
        {
            _productsRepository = productsRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
            _emailService = emailService;
        }

        //public async Task<IEnumerable<Product>> GetAll()
        //{
        //    var usersList = await _userRepository.GetAll();

        //    return usersList;
        //}

        public async Task<IEnumerable<Product>> LoadProducts(IFormFile file, DataSourceTypes dataSource)
        {
            //var usersList = await _productsRepository.GetAll();

            var productsList = await ReadProducts(file, dataSource);

            return productsList;
        }

        public async Task<IEnumerable<Product>> ReadProducts(IFormFile file, DataSourceTypes dataSource)
        {
            List<Product> products = new();

            try
            {
                if (dataSource == DataSourceTypes.Excel)
                {
                    using var stream = new MemoryStream();

                    Dictionary<string, Type> propertyTypes = new()
                    {
                        { "Id", typeof(long) },
                        { "Price", typeof(double) },
                        { "Quantity", typeof(long) },
                        { "IsActive", typeof(bool) },
                        { "ProductCategoryId", typeof(long) },
                        { "BrandId", typeof(long) },
                    };

                    await file.CopyToAsync(stream);

                    stream.Position = 0;

                    IWorkbook workbook = new XSSFWorkbook(stream);

                    ISheet sheet = workbook.GetSheetAt(0);

                    for (int rowIndex = 1; rowIndex <= sheet.LastRowNum; rowIndex++)
                    {
                        Product product = new();

                        IRow row = sheet.GetRow(rowIndex);

                        if (row != null)
                        {
                            for (int colIndex = 0; colIndex < row.LastCellNum; colIndex++)
                            {
                                ICell cell = row.GetCell(colIndex);

                                if (cell != null)
                                {
                                    string property = sheet.GetRow(0).GetCell(colIndex).ToString();

                                    if (propertyTypes.TryGetValue(property, out Type propertyType))
                                    {
                                        product.GetType().GetProperty(property)?.SetValue(product, Convert.ChangeType(cell.ToString(), propertyType));
                                    }
                                    else
                                    {
                                        product.GetType().GetProperty(property)?.SetValue(product, cell.ToString());
                                    }
                                }
                            }

                            products.Add(product);
                        }
                    }

                    return products;
                }
                else if (dataSource == DataSourceTypes.Connector)
                {
                    return products;
                }

                return products;
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Error al cargar el archivo.");
                throw new Exception(ex.Message);
            }
        }

        //public async Task<User> GetById(long userId)
        //{
        //    var user = await _userRepository.GetById(userId);

        //    return user;
        //}

        //    public async Task UpdateUser(User userRequest)
        //    {
        //        User user;

        //        user = await _userRepository.GetById(userRequest.Id);

        //        await _userRepository.Update(user);
        //    }

        //    public async Task<ServiceResponse> Create(CreateUserRequest request)
        //    {
        //        ServiceResponse response = new ServiceResponse
        //        {
        //            Metadata = new Metadata { },
        //            Data = new Data { }
        //        };

        //        try
        //        {
        //            response = await _userRepository.Create(request);
        //        }
        //        catch (Exception e)
        //        {
        //            response.Metadata.Status = System.Net.HttpStatusCode.BadRequest;
        //            response.Metadata.Message = e.Message;
        //        }

        //        return response;
        //    }
    }
}