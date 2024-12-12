namespace WebApi.Entities
{
    public class Model
    {
        public int Id { get; set; }
        public int FuelTypeId { get; set; }
        public FuelType FuelType { get; set; }
        public int GearTypeId { get; set; }
        public GearType GearType { get; set; }
        public int CarTypeId { get; set; }
        public CarType CarType { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string Description { get; set; }
        public int PersonCount { get; set; }
        public int LuggageCount { get; set; }
        public int DoorCount { get; set; }
        public int Price { get; set; }
        public string[] OtherServices { get; set; }
        public string[] OtherFeatures { get; set; }
        public string ImageDirectory { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}