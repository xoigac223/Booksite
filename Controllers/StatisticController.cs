using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using BookShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ubiety.Dns.Core.Records.NotUsed;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    public class StatisticController : Controller
    {
        private readonly BookshopContext _context;

        public StatisticController(BookshopContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Statistic()
        {
            ListDictionary sales = new ListDictionary();
            var firstMonth = DateTime.Now.Month;
            var firstYear = DateTime.Now.Year;
            sales.Add(Convert.ToString(firstMonth) + " - " + Convert.ToString(firstYear), GetSalesByMonth(firstMonth, firstYear));
            var secondMonth = firstMonth - 1 > 0 ? firstMonth - 1 : 12;
            var secondYear = firstMonth - 1 > 0 ? firstYear : firstYear - 1;
            sales.Add(Convert.ToString(secondMonth) + " - " + Convert.ToString(secondYear), GetSalesByMonth(secondMonth, secondYear));
            var thirdMonth = secondMonth - 1 > 0 ? secondMonth - 1 : 12;
            var thirdYear = secondMonth - 1 > 0 ? secondYear : secondYear - 1;
            sales.Add(Convert.ToString(thirdMonth) + " - " + Convert.ToString(thirdYear), GetSalesByMonth(thirdMonth, thirdYear));
            
            
            return Json(new
            {
                books = _context.Books.Count(),
                categories= _context.Categories.Count(),
                ordes = _context.Categories.Count(),
                users = _context.Users.Count(),
                sales = sales,
                bestSells = GetBestSellDictionary()
            });
        }

        private float GetSalesByMonth(int month, int year)
        {
            float result = 0;
            var orders = _context.Orders.ToList();
            foreach (var order in orders)
            {
                float tmp = 0;
                if (order.DateBill.Month == month && order.DateBill.Year == year)
                {
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
                    ).Where(q => q.ID == order.Id);

                    foreach (var q in queryable)
                    {
                        tmp += q.price * q.qty;
                    }
                }
                result += tmp;
            }
            
            return result;
        }

        private Dictionary<string, float> GetBestSellDictionary()
        {
            Dictionary<string, float> result = new Dictionary<string, float>();
            var books = _context.Books.Include(book => book.OrderDetails).ToList();
            foreach (var book in books)
            {
                float sale = 0;
                foreach (var order in book.OrderDetails)
                {
                    sale += book.Price * order.Quantity;
                }
                result.Add(book.Name, sale);
            }

            return result.OrderByDescending(x => x.Value).Take(3).ToDictionary(x => x.Key, x => x.Value);
        }
    }
}