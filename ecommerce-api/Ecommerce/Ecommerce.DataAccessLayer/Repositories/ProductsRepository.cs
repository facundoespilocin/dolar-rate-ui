﻿using Dapper;
using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Factory;
using Ecommerce.DataAccessLayer.Models;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.Utils.Extensions;

namespace Ecommerce.DataAccessLayer.Repositories
{
    public class ProductsRepository : IProductsRepository
    {
        private IConnectionFactory _factory;

        public ProductsRepository(IConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            using var con = _factory.GetDbConnection;

            var query = "SELECT * FROM Users";

            var user = await con.QueryAsync<User>(query);

            return user;
        }

        public async Task<User> GetById(long userId)
        {
            using var con = _factory.GetDbConnection;

            var query = $"SELECT * FROM Users WHERE Id = {userId}";

            var user = await con.QueryFirstOrDefaultAsync<User>(query);

            return user;
        }

        public async Task<ServiceResponse> Create(CreateUserRequest request)
        {
            using var con = _factory.GetDbConnection;

            var query = @"INSERT INTO Users (Name, LastName, Email, Password, CountryId, IndustryId, CellPhone, ConfirmationToken, BirthDate, CreatedDate)
                          VALUES (@Name, @LastName, @Email, @Password, @CountryId, @IndustryId, @CellPhone, @ConfirmationToken, @BirthDate, @CreatedDate);
                          SELECT LAST_INSERT_ID();";

            var result = await con.ExecuteScalarAsync<int>(query, new
            {
                request.Name,
                request.LastName,
                request.Email,
                Password = request.Password?.GenerateHash(),
                request.CountryId,
                request.IndustryId,
                request.ConfirmationToken,
                request.CellPhone,
                request.BirthDate,
                CreatedDate = DateTime.Now
            });

            return new ServiceResponse
            {
                Metadata = new Metadata
                {
                    Message = "Success",
                    Status = System.Net.HttpStatusCode.OK
                },
                Data = new Data
                {
                    Id = result,
                    Name = request.Name
                }
            };
        }

        public async Task Update(User user)
        {
            using var con = _factory.GetDbConnection;

            var query = @"UPDATE Users SET Name=@Name, Height=@Height, Mass=@Mass, HairColor=@HairColor, 
                        SkinColor=@SkinColor, EyeColor=@EyeColor, BirthYear=@BirthYear, Gender=@Gender, 
                        Homeworld=@Homeworld, Created=@Created, Edited=@Edited, Url=@Url
                        WHERE Id=@Id";

            await con.ExecuteAsync(query, user);
        }

        public async Task Delete(int userId)
        {
            using var con = _factory.GetDbConnection;

            var query = $@"DELETE FROM Users WHERE Id = {userId}";

            await con.ExecuteAsync(query);
        }
    }
}