using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAtendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<UserFollowing> UserFollowings { get; set; }


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

        modelBuilder.Entity<UserFollowing>(x =>
            {
                x.HasKey(uf => new { uf.ObserverId, uf.TargetId });

                x.HasOne(uf => uf.Observer)
                 .WithMany(u => u.Followings)
                 .HasForeignKey(uf => uf.ObserverId)
                 .OnDelete(DeleteBehavior.Cascade);

                x.HasOne(uf => uf.Target)
                 .WithMany(u => u.Followers)
                 .HasForeignKey(uf => uf.TargetId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

        // modelBuilder.Entity<UserFollowing>()//sets composite primary key
        //     .HasKey(uf => new { uf.ObserverId, uf.TargetId });

        // modelBuilder.Entity<UserFollowing>()// sets relationships
        //     .HasOne(uf => uf.Observer)
        //     .WithMany(u => u.Followings)
        //     .HasForeignKey(uf => uf.ObserverId);

        // modelBuilder.Entity<UserFollowing>()
        //     .HasOne(uf => uf.Target)
        //     .WithMany(u => u.Followers)
        //     .HasForeignKey(uf => uf.TargetId);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var properties = entityType.GetProperties();
            // .Where(p => p.PropertyType == typeof(DateTime) || p.PropertyType == typeof(DateTime?));

            foreach (var property in properties)
            {
                if (property.ClrType == typeof(DateTime))
                    property.SetValueConverter(dateTimeConverter);
                //modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion(dateTimeConverter);
            }
        }
    }
}
