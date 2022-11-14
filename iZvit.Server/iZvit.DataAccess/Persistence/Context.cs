using iZvit.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace iZvit.DataAccess.Persistence
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options)
        : base(options)
        {}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {   }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   }

        public DbSet<Report> Reports { get; set; }
    }

}
