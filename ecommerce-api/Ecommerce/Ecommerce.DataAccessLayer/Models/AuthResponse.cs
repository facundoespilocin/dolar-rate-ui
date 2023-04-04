using Ecommerce.DataAccessLayer.Entities.User;

namespace Ecommerce.DataAccessLayer.Models
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            UserData = new User();
        }

        public long Id { get; set; }
        public string Token { get; set; }
        public User UserData { get; set; }
    }
}