using System.ComponentModel.DataAnnotations;

namespace FilmuNuomaAPI.Data.EnTitties
{
    public class Order
    {
        public int Id { get; set; }
        public bool isPaid { get; set; }
        public float Price { get; set; }
        public string orderDate { get; set; }
        public string endDate { get; set; }
        /// string > movie
        public string Movie { get; set; }
    }
}
public record OrderDto(int Id, bool isPaid, float Price, string orderDate, string endDate, string Movie);
public record CreateOrderDto(bool isPaid, float Price, string orderDate, string endDate, string Movie);
public record UpdateOrderDto(bool isPaid, float Price, string orderDate, string endDate, string Movie);