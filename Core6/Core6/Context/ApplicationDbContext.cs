using System;
using Core6.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core6.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<BlogPostEntity> BlogPosts { get; set; }
    }

}

