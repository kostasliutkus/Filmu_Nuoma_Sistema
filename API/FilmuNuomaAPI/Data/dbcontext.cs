using FilmuNuomaAPI.Data.EnTitties;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace FilmuNuomaAPI.Data
{
    public class dbcontext :DbContext
    {
        public readonly IConfiguration _configuration;
        public DbSet<Order> orders { get; set; }
        public dbcontext(DbContextOptions<dbcontext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        {
            object value = optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
        }


    }
}
