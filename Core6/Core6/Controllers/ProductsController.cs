  using Microsoft.AspNetCore.Mvc;
  using Microsoft.AspNetCore.Http;
using Core6.Context;
using Core6.Dtos;
using Core6.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core6.Controllers
  {
      [ApiController]
      [Route("api/[controller]")]
      public class ProductsController : ControllerBase
      {
        private readonly ApplicationDbContext _context;
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }
        // CRUD -> Create - Read - Update - Delete

        // Create - POST
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateUpdateProductDto dto)
        {
            var newProduct = new ProductEntity (){
                Brand = dto.Brand,
                Title = dto.Title,
            };
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();

            return Ok("Product Saved Successfully");
        }

        // Read - GET
        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> GetAllProducts()
        {
            var products = await _context.Products.OrderByDescending(q => q.CreateAt).ToListAsync();
            return Ok(products);
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            if (product == null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(product);
        }

        // Update - PUT
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] long id, [FromBody] CreateUpdateProductDto dto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            if (product == null)
            {
                return NotFound("Product Not Found");
            }
            product.Brand = dto.Brand;
            product.Title = dto.Title;
            product.UpdatedAt = DateTime.Now;
            
            await _context.SaveChangesAsync();
            return Ok("Product Updated Successfully");
        }

        // Delete - DELETE
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            if (product == null)
            {
                return NotFound("Product Not Found");
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok("Product Deleted Successfully");
        }

      }
  }