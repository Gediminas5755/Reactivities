using System.Text.Json.Serialization;

namespace API.DTOs;

public class GitHubInfo
{
    public class GitHubAuthRequest
    {
        public required string Code { get; set; }

        [JsonPropertyName("client_id")]
        public required string ClientId { get; set; }

        [JsonPropertyName("client_secret")]
        public required string ClientSecret { get; set; }

        [JsonPropertyName("redirect_uri")]
        public string RedirectUri { get; set; }
    }

    public class GitHubTokenResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = string.Empty;
    }

    public class GitHubUser
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName("avatar_url")]
        public string? ImageUrl { get; set; } = string.Empty;
    }

    public class GitHubEmail
    {
        public string Email {get;set;} = string.Empty;
        public bool Primary { get; set; }
        public bool Verified { get; set; }
    }
}
