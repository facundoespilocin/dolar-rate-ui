using Dapper;
using Ecommerce.DataAccessLayer.Entities.User;
using Ecommerce.DataAccessLayer.Factory;
using Ecommerce.DataAccessLayer.Repositories.Interfaces;
using Ecommerce.Utils.Extensions;

namespace Ecommerce.DataAccessLayer.Repositories
{
    public class UserRepository : IUserRepository
    {
        private IConnectionFactory _factory;

        public UserRepository(IConnectionFactory factory)
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

        public async Task Create(User request)
        {
            using var con = _factory.GetDbConnection;

            var query = @"INSERT INTO Users (Name, LastName, Email, Password, Country, City, CellPhone, BirthDate, CreatedDate) 
                            VALUES (@Name, @LastName, @Email, @Password, @Country, @City, @CellPhone, @BirthDate, @CreatedDate)";

            await con.QueryFirstOrDefaultAsync<User>(query, new
            {
                request.Name,
                request.LastName,
                request.Email,
                request.Password,
                request.Country,
                request.City,
                request.CellPhone,
                request.BirthDate,
                CreatedDate = DateTime.Now
            });
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

        public async Task<User> GetByCredentials(string email, string password)
        {
            using var con = _factory.GetDbConnection;

            var passwordHash = password.GenerateHash();

            var user = await con.QueryFirstOrDefaultAsync<User>(@"SELECT * FROM Users WHERE Email = @Email and Password = @Password", new
            {
                Email = email,
                Password = passwordHash
            });

            return user;
        }

        public async Task<User> GetUserByToken(string token)
        {
            using var con = _factory.GetDbConnection;

            var user = await con.QueryFirstOrDefaultAsync<User>(@"SELECT * FROM Users WHERE PasswordResetToken = @Token AND HasRequestedResetPassword = 1", new
            {
                Token = token
            });

            return user;
        }

        public async Task UpdateUserPassword(string token, string password)
        {
            var passwordHash = password.GenerateHash();

            using var con = _factory.GetDbConnection;

            var result = await con.QueryAsync<int>(@"UPDATE Users SET Password = @Password, PasswordResetToken = null WHERE PasswordResetToken = @Token;", new
            {
                Password = passwordHash,
                Token = token
            });
        }

        public async Task<User> GetUserByEmailWithPass(string email)
        {
            using var con = _factory.GetDbConnection;

            var user = await con.QueryFirstOrDefaultAsync<User>(@"SELECT * FROM Users WHERE Email = @Email AND Password != '';", new
            {
                Email = email
            });

            return user;
        }

        public async Task UpdateResetPasswordToken(string email, string token)
        {
            using var con = _factory.GetDbConnection;

            var result = await con.QueryAsync<int>(@"UPDATE Users SET HasRequestedPasswordMail = 1, PasswordResetToken = @Token WHERE Email = @Email;", new
            {
                Email = email,
                Token = token
            });
        }
    }
}