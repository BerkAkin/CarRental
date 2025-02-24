using WebApi.Entities;

namespace WebApi.DTOs.Models
{
    public class ModelViewModel
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public CarType CarType { get; set; }
        public FuelType FuelType { get; set; }
        public GearType GearType { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string Description { get; set; }
        public int PersonCount { get; set; }
        public int LuggageCount { get; set; }
        public int DoorCount { get; set; }
        public int Price { get; set; }
        public string OtherServices { get; set; }
        public string OtherFeatures { get; set; }
        public string ImageDirectory { get; set; }
    }
}