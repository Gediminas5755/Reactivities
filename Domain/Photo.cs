namespace Domain;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Url { get; set; }
    public string PublicId { get; set; }

    // Navigation property to User
    public required string UserId { get; set; }
    public User User { get; set; } = null!;
}
