using FilmuNuomaAPI.Data;
using FilmuNuomaAPI.Data.EnTitties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Data;
using System.Security.Claims;
using FilmuNuomaAPI.Endpoints;

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
OrderEndpoints.AddOrderAPI(OrderGroup);



app.Run();
