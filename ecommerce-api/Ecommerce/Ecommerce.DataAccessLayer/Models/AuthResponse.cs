using Ecommerce.DataAccessLayer.Entities.User;

namespace Ecommerce.DataAccessLayer.Models
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            UserData = new UserDataDTO();
        }

        public long Id { get; set; }
        public string Token { get; set; }
        public UserDataDTO UserData { get; set; }
    }
}