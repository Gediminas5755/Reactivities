namespace Application.Activities.DTOs
{
    public class BaseActivityDto
    {
        // [Required]
        public string Title { get; set; } = "";
        // [Required]
        public DateTime Date { get; set; }
        // [Required]
        public string Description { get; set; } = "";
        // [Required]
        public string Category { get; set; } = "";
        // [Required]
        public string City { get; set; } = "";
        // [Required]
        public string Venue { get; set; } = "";
        // [Required]
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}