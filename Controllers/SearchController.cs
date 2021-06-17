using System;
using System.Linq;
using BookShop.DTO;
using BookShop.Models;
using BookShop.Service;
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
        
        [HttpGet("book")]
        public JsonResult GetBooks(SieveModel sieveModel)
        {
            var result = _context.Books.OrderByDescending(b => b.Id).AsNoTracking();
            result = _sieveProcessor.Apply(sieveModel, result);
            return Json(result);
        }
        [HttpGet("order")]
        public JsonResult GetOrders(SieveModel sieveModel)
        {
            var result = Enumerable.Empty<OrderDto>().AsQueryable();
            var orders = _context.Orders.ToList();
            orders.Reverse();
            foreach (var order in orders)
            {
                OrderDto dto = new OrderDto();
                dto.Address = order.Address;
                dto.Email = order.Email;
                dto.Fullname = order.Fullname;
                dto.Id = order.Id;
                dto.Phone = order.Phone;
                dto.Shipping = order.Shipping;
                dto.Status = order.Status;
                dto.Total = Total(order.Id);
                dto.Username = order.Username;
                dto.DateBill = order.DateBill;
                result = result.Append(dto);
            }
            result = _sieveProcessor.Apply(sieveModel, result);
            return Json(result);
        }
        
        private float Total(int id)
        {
            float result = 0;
            var queryable = _context.OrderDetails.AsNoTracking().Join(
                _context.Books,
                detail => detail.BookId,
                book => book.Id,
                (detail, book) => new
                {
                    ID = detail.OrderId,
                    price = book.Price,
                    qty = detail.Quantity
                }
            ).Where(q => q.ID == id);

            foreach (var q in queryable)
            {
                result += q.price * q.qty;
            }

            return result;
        }
    }
}