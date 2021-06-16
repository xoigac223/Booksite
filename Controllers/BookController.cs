using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BookShop.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookShop.Models;
using BookShop.Service;
using Microsoft.AspNetCore.Hosting;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookshopContext _context;
        private readonly IWebHostEnvironment _environment;

        public BookController(BookshopContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Book
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.Include(b => b.CategoryBooks).ToListAsync();
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBook(int id)
        {
            Book book = _context.Books.FindAsync(id).Result;
            if (book == null)
            {
                return NotFound();
            }
            else
            {
                BookDto bookDto = BookToBookDto.convert(book);
                bookDto.Categories = new List<Category>();
                var query = _context.CategoryBooks.Join(
                    _context.Categories,
                    categoryBook => categoryBook.Category,
                    category => category.Id,
                    (categoryBook, category) => new
                    {
                        ID = categoryBook.Book,
                        CATEGORY = category
                    }
                ).Where(q => q.ID == bookDto.Id);

                foreach (var q in query)
                {
                    bookDto.Categories.Add(q.CATEGORY);
                }

                return bookDto;
            }
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, [FromForm] BookFormDto bookFormDto)
        {
            Book book = BookFromDtoToBook.Convert(bookFormDto);
            book.ImageUrl =_context.Books.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id).Result.ImageUrl;
            if (id != book.Id)
            {
                return BadRequest();
            }
            if (bookFormDto.ImageFile != null)
            {
                if (bookFormDto.ImageFile.Length > 0)
                {
                    if (!Directory.Exists(_environment.WebRootPath + "//images//books//"))
                    {
                        Directory.CreateDirectory(_environment.WebRootPath + "//images//books//");
                    }

                    using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "//images/books//" + bookFormDto.ImageFile.FileName))
                    {
                        bookFormDto.ImageFile.CopyTo(fileStream);
                        fileStream.Flush();
                        book.ImageUrl = "/images/books/" + bookFormDto.ImageFile.FileName;
                    }
                }
            }
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook([FromForm] BookFormDto bookFormDto)
        {
            Book book = BookFromDtoToBook.Convert(bookFormDto);

            if (bookFormDto.ImageFile != null)
            {
                if (bookFormDto.ImageFile.Length > 0)
                {
                    if (!Directory.Exists(_environment.WebRootPath + "//images//books//"))
                    {
                        Directory.CreateDirectory(_environment.WebRootPath + "//images//books//");
                    }

                    using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "//images//books//" + bookFormDto.ImageFile.FileName))
                    {
                        bookFormDto.ImageFile.CopyTo(fileStream);
                        fileStream.Flush();
                        book.ImageUrl = "/images/books/" + bookFormDto.ImageFile.FileName;
                    }
                }
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
