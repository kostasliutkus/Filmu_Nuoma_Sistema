using FilmuNuomaAPI.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<FilmDbContext>(options =>options.UseMySql(builder.Configuration.GetConnectionString("MYSQLDefaultConnection")));
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

OrderGroup.MapGet("/orders", async (int orderid, FilmDbContext dbContext) =>
{
    var city = await dbContext.orders.FirstOrDefaultAsync(c => c.Id == orderid); ;

    if (city == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(new OrderDto(city.Id, city.isPaid, city.Price, city.orderDate, city.endDate, city.Movie));

});







app.Run();
