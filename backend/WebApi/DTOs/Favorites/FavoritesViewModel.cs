using WebApi.Entities;

namespace WebApi.DTOs.Favorites
{
    public class FavoriteViewModel
    {
        public int ModelId { get; set; }
        public string CarType { get; set; }
        public string GearType { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public int PersonCount { get; set; }
        public int Price { get; set; }
        public string ImageDirectory { get; set; }
    }
}