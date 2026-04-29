using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Resend;

namespace Infrastructure.Email
{
    // public class EmailSender(IResend resend) : IEmailSender<User>
    public class EmailSender(IServiceScopeFactory scopeFactory) : IEmailSender<User>
    {
        public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
        {
            var subject = "Confirm your email";
            var body = $@"
                <p>Please confirm your email by clicking the link below:</p>
                <p><a href='{confirmationLink}'>Confirm Email</a></p>";

            await SendMailAsync(email, subject, body);
        }

        private async Task SendMailAsync(string email, string subject, string body)
        {
            using var scope = scopeFactory.CreateScope();
            var resend = scope.ServiceProvider.GetRequiredService<IResend>();
            
            var message = new EmailMessage
            {
                From = "whatever@resend.dev",
                Subject = subject,
                HtmlBody = body
            };
            message.To.Add(email);

            Console.WriteLine(message.HtmlBody);
             await resend.EmailSendAsync(message);
            await Task.CompletedTask;
        }

        public Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
        {
            throw new NotImplementedException();
        }

        public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
        {
            throw new NotImplementedException();
        }
    }
}