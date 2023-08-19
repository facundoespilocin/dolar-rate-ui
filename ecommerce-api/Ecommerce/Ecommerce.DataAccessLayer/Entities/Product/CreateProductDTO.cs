using Ecommerce.DataAccessLayer.Entities.Product;
using System.Text.Json.Serialization;

namespace Ecommerce.DataAccessLayer.Entities.Product
{
    public class CreateProductDTO
    {
        public ProductDTO Product { get; set; }

        public class ProductDTO
        {
            public string? Name { get; set; }
            public string? Description { get; set; }
            public string? ShortDescription { get; set; }
            public double Price { get; set; }
            public long Quantity { get; set; } = 0;
            public bool IsActive { get; set; } = true;
            public long CategoryId { get; set; } = 1;
            public string? ImageUrl { get; set; }
            public string? Discount { get; set; }
            public string? CustomAttributes { get; set; }
        }
    }
}