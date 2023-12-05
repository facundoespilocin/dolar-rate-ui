using Ecommerce.DataAccessLayer.Entities.Product;
using static Ecommerce.Utils.Enums;

namespace Ecommerce.DataAccessLayer.Entities.Order
{
    public class UpdateOrderDTO
    {
        public long Id { get; set; }
        public long OrganizationId { get; set; }
        public long Items { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate => DateTime.Now;
    }
}