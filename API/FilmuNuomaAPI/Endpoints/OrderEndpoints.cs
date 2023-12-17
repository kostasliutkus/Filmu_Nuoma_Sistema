using FilmuNuomaAPI.Data;
using FilmuNuomaAPI.Data.EnTitties;
using Microsoft.EntityFrameworkCore;

namespace FilmuNuomaAPI.Endpoints
{
    public class OrderEndpoints
    {
        public static void AddOrderAPI(RouteGroupBuilder OrderGroup)
        {
            OrderGroup.MapGet("orders/", async (dbcontext dbContext) =>
            {
                return (await dbContext.orders.ToListAsync()).Select(order => new OrderDto(order.Id, order.isPaid, order.Price, order.orderDate, order.endDate, order.Movie));
            });
            OrderGroup.MapGet("orders/{orderid:int}", async (int orderid, dbcontext dbContext) =>
            {
                var order = await dbContext.orders.FirstOrDefaultAsync(c => c.Id == orderid); ;

                if (order == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(new OrderDto(order.Id, order.isPaid, order.Price, order.orderDate, order.endDate, order.Movie));

            });
            OrderGroup.MapPost("orders/", async (CreateOrderDto createCityDto, dbcontext dbContext) =>
            {

                var order = new Order()
                {
                    isPaid = createCityDto.isPaid,
                    Price = createCityDto.Price,
                    orderDate = createCityDto.orderDate,
                    endDate = createCityDto.endDate,
                    Movie = createCityDto.Movie
                };
                dbContext.orders.Add(order);
                await dbContext.SaveChangesAsync();

                return Results.Created($"/api/orders/{order.Id:int}", new OrderDto(order.Id, order.isPaid, order.Price, order.orderDate, order.endDate, order.Movie));
            });
            OrderGroup.MapPut("orders/{orderId:int}", async (HttpContext httpContext, int orderId, UpdateOrderDto updateOrderDto, dbcontext dbContext) =>
            {
                Order order = await dbContext.orders.FirstOrDefaultAsync<Order>(order => order.Id == orderId);
                if (order == null)
                {
                    return Results.NotFound();
                }
                order.endDate = updateOrderDto.endDate;
                order.Price = updateOrderDto.Price;

                // can edit more
                dbContext.Update(order);

                await dbContext.SaveChangesAsync();
                return Results.Ok(new OrderDto(order.Id, order.isPaid, order.Price, order.orderDate, order.endDate, order.Movie));
            });
            OrderGroup.MapDelete("orders/{orderId:int}", async (int orderId, dbcontext dbcontext) =>
            {
                var order = await dbcontext.orders.FirstOrDefaultAsync(c => c.Id == orderId);
                if (order == null)
                {
                    return Results.NotFound();
                }
                dbcontext.Remove(order);
                await dbcontext.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
