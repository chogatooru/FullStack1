using Microsoft.AspNetCore.Mvc;
using Core6.Context;
using Core6.Dtos;
using Core6.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core6.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BlogPostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create - POST
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateUpdatePostDto dto)
        {
            var newBlogPost = new BlogPostEntity
            {
                Content = dto.Content,
                Title = dto.Title,
            };
            await _context.BlogPosts.AddAsync(newBlogPost);
            await _context.SaveChangesAsync();

            return Ok("Blog Post Saved Successfully");
        }

        // Read - GET
        [HttpGet]
        public async Task<ActionResult<List<BlogPostEntity>>> GetAllBlogPosts()
        {
            var blogPosts = await _context.BlogPosts.OrderByDescending(q => q.UpdatedAt).ToListAsync();
            return Ok(blogPosts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPostEntity>> GetBlogPostById([FromRoute] long id)
        {
            var blogPost = await _context.BlogPosts.FirstOrDefaultAsync(q => q.Id == id);
            if (blogPost == null)
            {
                return NotFound("Blog Post Not Found");
            }
            return Ok(blogPost);
        }

        // Update - PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogPost([FromRoute] long id, [FromBody] CreateUpdatePostDto dto)
        {
            var blogPost = await _context.BlogPosts.FirstOrDefaultAsync(q => q.Id == id);
            if (blogPost == null)
            {
                return NotFound("Blog Post Not Found");
            }
            blogPost.Content = dto.Content;
            blogPost.Title = dto.Title;
            blogPost.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok("Blog Post Updated Successfully");
        }

        // Delete - DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] long id)
        {
            var blogPost = await _context.BlogPosts.FirstOrDefaultAsync(q => q.Id == id);
            if (blogPost == null)
            {
                return NotFound("Blog Post Not Found");
            }
            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();
            return Ok("Blog Post Deleted Successfully");
        }
    }
}
