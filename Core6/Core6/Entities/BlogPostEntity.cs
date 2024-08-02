using System;
using System.ComponentModel.DataAnnotations;

namespace Core6.Entities
{
    public class BlogPostEntity
    {
        [Key]
        public long Id { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}

