using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookShop.Models;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryBookController : ControllerBase
    {
        private readonly BookshopContext _context;

        public CategoryBookController(BookshopContext context)
        {
            _context = context;
        }

        // GET: api/CategoryBook
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryBook>>> GetCategoryBooks()
        {
            return await _context.CategoryBooks.ToListAsync();
        }

        // GET: api/CategoryBook/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryBook>> GetCategoryBook(int id)
        {
            var categoryBook = await _context.CategoryBooks.FindAsync(id);

            if (categoryBook == null)
            {
                return NotFound();
            }

            return categoryBook;
        }

        // PUT: api/CategoryBook/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoryBook(int id, CategoryBook categoryBook)
        {
            if (id != categoryBook.Category)
            {
                return BadRequest();
            }

            _context.Entry(categoryBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CategoryBook
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoryBook>> PostCategoryBook(CategoryBook categoryBook)
        {
            _context.CategoryBooks.Add(categoryBook);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CategoryBookExists(categoryBook.Category))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCategoryBook", new { id = categoryBook.Category }, categoryBook);
        }

        // DELETE: api/CategoryBook/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoryBook(int id)
        {
            var categoryBook = await _context.CategoryBooks.FindAsync(id);
            if (categoryBook == null)
            {
                return NotFound();
            }

            _context.CategoryBooks.Remove(categoryBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryBookExists(int id)
        {
            return _context.CategoryBooks.Any(e => e.Category == id);
        }
    }
}
