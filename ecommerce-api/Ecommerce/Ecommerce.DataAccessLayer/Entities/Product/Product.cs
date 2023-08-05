using System.Text.Json.Serialization;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.DataAccessLayer.Entities.Product
{
    public class Product
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public long Quantity { get; set; }
        public bool IsActive { get; set; } = true;
        public long ProductCategoryId { get; set; }

        [JsonIgnore]
        public long BrandId { get; set; }

        public string? Tags { get; set; }
        public string? ImageUrl { get; set; }

        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
    }
}