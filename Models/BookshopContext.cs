using System;
using BookShop.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace BookShop.Models
{
    public partial class BookshopContext : IdentityDbContext<ApplicationUser>
    {
        public BookshopContext()
        {
        }

        public BookshopContext(DbContextOptions<BookshopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoryBook> CategoryBooks { get; set; }
        public virtual DbSet<EfmigrationsHistory> EfmigrationsHistories { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PRIMARY");

                entity.ToTable("admin");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .HasColumnName("username");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("book");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Author)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("author");

                entity.Property(e => e.Description)
                    .HasMaxLength(1000)
                    .HasColumnName("description");

                entity.Property(e => e.Details)
                    .HasMaxLength(200)
                    .HasColumnName("details");

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .HasColumnName("image_url");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Pages).HasColumnName("pages");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Publisher)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("publisher");

                entity.Property(e => e.PublishingYear)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("publishing_year");

                entity.Property(e => e.Status)
                    .HasColumnType("tinyint")
                    .HasColumnName("status");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<CategoryBook>(entity =>
            {
                entity.HasKey(e => new { e.Category, e.Book })
                    .HasName("PRIMARY");

                entity.ToTable("category_book");

                entity.HasIndex(e => e.Book, "book");

                entity.Property(e => e.Category).HasColumnName("category");

                entity.Property(e => e.Book).HasColumnName("book");

                entity.HasOne(d => d.BookNavigation)
                    .WithMany(p => p.CategoryBooks)
                    .HasForeignKey(d => d.Book)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("category_book_ibfk_2");

                entity.HasOne(d => d.CategoryNavigation)
                    .WithMany(p => p.CategoryBooks)
                    .HasForeignKey(d => d.Category)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("category_book_ibfk_1");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("order");

                entity.HasIndex(e => e.Username, "username");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("address");
                
                entity.Property(e => e.Shipping)
                    .IsRequired()
                    .HasColumnName("shipping");
                
                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status");

                entity.Property(e => e.DateBill).HasColumnName("date_bill");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("fullname");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("phone");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("username");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("order_ibfk_1");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.BookId })
                    .HasName("PRIMARY");

                entity.ToTable("order_detail");

                entity.HasIndex(e => e.BookId, "book_id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.BookId).HasColumnName("book_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("order_detail_ibfk_2");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("order_detail_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .HasColumnName("username");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(100)
                    .HasColumnName("fullname");

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<EfmigrationsHistory>(entity =>
            {
                entity.HasKey(e => e.MigrationId)
                    .HasName("PRIMARY");

                entity.ToTable("__EFMigrationsHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });
            
            base.OnModelCreating(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
