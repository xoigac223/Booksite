using System.Collections.Generic;
using BookShop.Models;

namespace BookShop.DTO
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public byte Status { get; set; }
        public int Pages { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public string PublishingYear { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<Category> Categories { get; set; } 
    }
}