using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.DbOperations
{
    public class CRDbContext : DbContext
    {
        public CRDbContext(DbContextOptions<CRDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(user =>
            {
                user.Property(u => u.Id).ValueGeneratedOnAdd();
                user.Property(u => u.Name).IsRequired().HasMaxLength(25);
                user.Property(u => u.Surname).IsRequired().HasMaxLength(25);
                user.Property(u => u.Email).IsRequired().HasMaxLength(70);
                user.Property(u => u.PhoneNum).IsRequired().HasMaxLength(13);
                user.Property(u => u.PasswordHashed).IsRequired().HasMaxLength(255);
                user.Property(u => u.RoleId).HasDefaultValue(2);
                user.Property(u => u.IsActive).HasDefaultValue(true);
                user.Property(u => u.CreatedAt).HasDefaultValueSql("GETDATE()");
                user.Property(u => u.LastOnline).HasDefaultValueSql("GETDATE()");

                user.HasIndex(u => u.Email).IsUnique();
                user.HasOne(u => u.Role).WithMany();
            });
            modelBuilder.Entity<Role>(role =>
            {
                role.Property(r => r.Id).ValueGeneratedOnAdd();
                role.Property(r => r.Name).IsRequired().HasMaxLength(25);
                role.Property(r => r.Description).IsRequired().HasMaxLength(500);
                role.Property(r => r.CreatedAt).HasDefaultValueSql("GETDATE()");
                role.Property(r => r.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();

            });
            modelBuilder.Entity<FAQText>(faq =>
            {
                faq.Property(f => f.Id).ValueGeneratedOnAdd();
                faq.Property(f => f.Title).IsRequired().HasMaxLength(200);
                faq.Property(f => f.Content).IsRequired().HasMaxLength(500);
                faq.Property(f => f.CreatedAt).HasDefaultValueSql("GETDATE()");
                faq.Property(f => f.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();

            });
            modelBuilder.Entity<LandingServiceText>(landingService =>
            {
                landingService.Property(ls => ls.Id).ValueGeneratedOnAdd();
                landingService.Property(ls => ls.Title).IsRequired().HasMaxLength(200);
                landingService.Property(ls => ls.Content).IsRequired().HasMaxLength(500);
                landingService.Property(ls => ls.CreatedAt).HasDefaultValueSql("GETDATE()");
                landingService.Property(ls => ls.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();
                landingService.HasOne(ls => ls.Icon).WithMany().HasForeignKey(ls => ls.IconId);
            });
            modelBuilder.Entity<LandingMainText>(landingMain =>
            {
                landingMain.Property(lm => lm.Id).ValueGeneratedOnAdd();
                landingMain.Property(lm => lm.Text).IsRequired().HasMaxLength(500);
                landingMain.Property(lm => lm.CreatedAt).HasDefaultValueSql("GETDATE()");
                landingMain.Property(lm => lm.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();

            });
            modelBuilder.Entity<LandingReasonText>(landingReason =>
            {
                landingReason.Property(lr => lr.Id).ValueGeneratedOnAdd();
                landingReason.Property(lr => lr.Title).IsRequired().HasMaxLength(200);
                landingReason.Property(lr => lr.Content).IsRequired().HasMaxLength(500);
                landingReason.Property(lr => lr.CreatedAt).HasDefaultValueSql("GETDATE()");
                landingReason.Property(lr => lr.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();

            });
            modelBuilder.Entity<UserComment>(userComment =>
            {
                userComment.Property(uc => uc.Id).ValueGeneratedOnAdd();
                userComment.Property(uc => uc.Content).IsRequired().HasMaxLength(250);
                userComment.Property(uc => uc.StarCount).IsRequired();
                userComment.Property(uc => uc.CreatedAt).HasDefaultValueSql("GETDATE()");
                userComment.Property(uc => uc.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();
                userComment.Property(u => u.IsActive).HasDefaultValue(false);
                userComment.Property(u => u.IsNew).HasDefaultValue(true);

                userComment.HasOne(uc => uc.User).WithOne(u => u.UserComment).HasForeignKey<UserComment>(uc => uc.UserId);

                userComment.HasIndex(uc => uc.UserId).IsUnique();

            });
            modelBuilder.Entity<FuelType>(fueltype =>
            {
                fueltype.Property(ft => ft.Id).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<GearType>(geartype =>
            {
                geartype.Property(gt => gt.Id).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Model>(model =>
            {
                model.Property(m => m.Id).ValueGeneratedOnAdd();
                model.Property(m => m.FuelTypeId).IsRequired();
                model.Property(m => m.GearTypeId).IsRequired();
                model.Property(m => m.CarTypeId).IsRequired();
                model.Property(m => m.BrandName).IsRequired().HasMaxLength(100);
                model.Property(m => m.ModelName).IsRequired().HasMaxLength(100);
                model.Property(m => m.Description).IsRequired().HasMaxLength(500);
                model.Property(m => m.PersonCount).IsRequired();
                model.Property(m => m.LuggageCount).IsRequired();
                model.Property(m => m.DoorCount).IsRequired();
                model.Property(m => m.OtherServices).IsRequired();
                model.Property(m => m.OtherFeatures).IsRequired();
                model.Property(m => m.ImageDirectory).IsRequired().HasMaxLength(500);
                model.Property(m => m.CreatedAt).HasDefaultValueSql("GETDATE()");
                model.Property(m => m.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();
                model.Property(m => m.Slug).IsRequired();

                model.HasOne(m => m.FuelType).WithMany().HasForeignKey(m => m.FuelTypeId).OnDelete(DeleteBehavior.Restrict);
                model.HasOne(m => m.GearType).WithMany().HasForeignKey(m => m.GearTypeId).OnDelete(DeleteBehavior.Restrict);
                model.HasOne(m => m.CarType).WithMany().HasForeignKey(m => m.CarTypeId).OnDelete(DeleteBehavior.Restrict);

            });
            modelBuilder.Entity<UserFavorite>(ufc =>
            {
                ufc.Property(m => m.Id).ValueGeneratedOnAdd();
                ufc.Property(uc => uc.CreatedAt).HasDefaultValueSql("GETDATE()");
                ufc.Property(uc => uc.UpdatedAt).HasDefaultValueSql("GETDATE()").ValueGeneratedOnAddOrUpdate();
                ufc.HasKey(ufc => new { ufc.UserId, ufc.ModelId });
                ufc.HasOne(ufc => ufc.User).WithMany(u => u.FavoriteCars).HasForeignKey(ufc => ufc.UserId);
                ufc.HasOne(ufc => ufc.Model).WithMany(c => c.UserFavorites).HasForeignKey(ufc => ufc.ModelId);
            });


            modelBuilder.Entity<Contact>(cn =>
            {
                cn.Property(cn => cn.Id).ValueGeneratedOnAdd();
                cn.Property(cn => cn.Name).IsRequired().HasMaxLength(25);
                cn.Property(cn => cn.Surname).IsRequired().HasMaxLength(25);
                cn.Property(cn => cn.Email).IsRequired().HasMaxLength(70);
                cn.Property(cn => cn.Permission).IsRequired().HasMaxLength(6);
                cn.Property(cn => cn.Platform).IsRequired().HasMaxLength(50);
                cn.Property(cn => cn.Phone).IsRequired().HasMaxLength(13);
                cn.Property(cn => cn.IsRead).IsRequired().HasDefaultValue(false);
            });

            modelBuilder.Entity<Icon>(icon =>
            {
                icon.Property(icon => icon.Id).ValueGeneratedOnAdd();
            });


        }


        public DbSet<LandingMainText> LandingMainTexts { get; set; }
        public DbSet<LandingReasonText> LandingReasonTexts { get; set; }
        public DbSet<LandingServiceText> LandingServiceTexts { get; set; }
        public DbSet<FAQText> FAQTexts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserComment> UserComments { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }
        public DbSet<FuelType> FuelTypes { get; set; }
        public DbSet<GearType> GearTypes { get; set; }
        public DbSet<CarType> CarTypes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Icon> Icons { get; set; }
    }
}