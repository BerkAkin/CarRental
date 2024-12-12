using WebApi.Entities;

namespace WebApi.DTOs.Models
{
    public class ModelSummaryViewModel
    {

        public int Id { get; set; }
        public CarType CarType { get; set; }
        public GearType GearType { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public int PersonCount { get; set; }
        public int LuggageCount { get; set; }
        public int DoorCount { get; set; }
        public int Price { get; set; }
        public string ImageDirectory { get; set; }
    }
}