namespace Ecommerce.DataAccessLayer.Entities.User
{
    public class User
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? CellPhone { get; set; }
        public bool ConfirmedAccount { get; set; }
        public bool IsActive { get; set; } = true;
        public string? PasswordResetToken { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}