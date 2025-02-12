namespace WebApi.Entities
{
    public class Icon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<LandingServiceText> LandingServiceTexts { get; set; }
    }
}