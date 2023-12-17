using FilmuNuomaAPI.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<dbcontext>(options =>options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

var OrderGroup = app.MapGroup("/api");

OrderGroup.MapGet("/orders", async (int orderid, dbcontext dbContext) =>
{
    var order = await dbContext.orders.FirstOrDefaultAsync(c => c.Id == orderid); ;

    if (order == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(new OrderDto(order.Id, order.isPaid, order.Price, order.orderDate, order.endDate, order.Movie));

});







app.Run();
