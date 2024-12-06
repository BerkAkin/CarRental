using carRental.API.Models.Domain;
using carRental.API.Data;
using Microsoft.EntityFrameworkCore;

namespace carRental.API.Repository.image
{
    public class ImageRepositoy : IImageRepository
    {
        private readonly CarRentalDbContext dbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ImageRepositoy(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, CarRentalDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public async Task<Image> CreateAsync(Image image)
        {
            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{image.FileName}{image.FileExtension}");

            // upload to local path
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await image.File.CopyToAsync(stream);

            // https://localhost:1234/images/image.jpeg
            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Images/{image.FileName}{image.FileExtension}";

            image.FilePath = urlFilePath;

            await dbContext.Images.AddAsync(image);
            await dbContext.SaveChangesAsync();
            return image;
        }

        public async Task<Image?> DeleteAsync(Guid Id)
        {
            var image = await dbContext.Images.FirstOrDefaultAsync(x => x.Id == Id);

            if (image == null)
            {
                return null; // Image not found
            }

            // Delete the file from the file system
            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{image.FileName}{image.FileExtension}");
            if (File.Exists(localFilePath))
            {
                File.Delete(localFilePath); // Delete the file
            }

            dbContext.Images.Remove(image);
            await dbContext.SaveChangesAsync();
            return image; // Return the deleted image
        }
    }
}
