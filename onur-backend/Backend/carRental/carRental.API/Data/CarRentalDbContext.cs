using carRental.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Data
{
    public class CarRentalDbContext : DbContext
    {
        public CarRentalDbContext(DbContextOptions<CarRentalDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<FaQ> FaQs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure one-to-one relationship between Car and Category
            modelBuilder.Entity<Car>()
                .HasOne(c => c.Category)
                .WithOne()
                .HasForeignKey<Car>(c => c.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);  // Set to Restrict or Cascade based on desired behavior

            // Configure one-to-one relationship between Car and Image
            modelBuilder.Entity<Car>()
                .HasOne(c => c.Image)
                .WithOne()
                .HasForeignKey<Car>(c => c.ImageId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure one-to-one relationship between Category and Image
            modelBuilder.Entity<Category>()
                .HasOne(cat => cat.Image)
                .WithOne()
                .HasForeignKey<Category>(cat => cat.ImageId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure one-to-one relationship between Blog and Image
            modelBuilder.Entity<Blog>()
                .HasOne(blog => blog.Image)
                .WithOne()
                .HasForeignKey<Blog>(blog => blog.ImageId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
