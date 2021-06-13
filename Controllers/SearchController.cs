using System;
using System.Linq;
using BookShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly BookshopContext _context;

        private readonly ISieveProcessor _sieveProcessor;
            
        public SearchController(BookshopContext context, ISieveProcessor sieveProcessor)
        {
            _context = context;
            _sieveProcessor = sieveProcessor;
        }
        
        [HttpGet]
        public JsonResult GetPosts(SieveModel sieveModel) 
        {
            var result = _context.CategoryBooks.Include(b => b.BookNavigation).AsNoTracking();
            result = _sieveProcessor.Apply(sieveModel, result);
            return Json(result);
        }
        
    }
}