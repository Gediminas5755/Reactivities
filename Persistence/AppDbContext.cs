using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAtendee> ActivityAttendees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ActivityAtendee>()//sets composite primary key
            .HasKey(aa => new { aa.UserId, aa.ActivityId });

        modelBuilder.Entity<ActivityAtendee>()// sets relationships
            .HasOne(aa => aa.User)
            .WithMany(u => u.Activities)
            .HasForeignKey(aa => aa.UserId);

        modelBuilder.Entity<ActivityAtendee>()
            .HasOne(aa => aa.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
    }
}
