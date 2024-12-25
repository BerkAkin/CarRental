namespace WebApi.DTOs.Models
{
    public class ModelUpdateModel
    {

        public int FuelTypeId { get; set; }
        public int GearTypeId { get; set; }
        public int CarTypeId { get; set; }
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
    }
}