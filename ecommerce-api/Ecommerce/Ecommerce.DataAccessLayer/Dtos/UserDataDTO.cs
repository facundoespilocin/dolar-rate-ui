using Ecommerce.DataAccessLayer.Entities.User;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DataAccessLayer.Models
{
    public class UserDataDTO
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? CellPhone { get; set; }
        public DateTime BirthDate { get; set; }
    }
}