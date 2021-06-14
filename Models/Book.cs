using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class Book
    {
        public Book()
        {
            CategoryBooks = new HashSet<CategoryBook>();
            OrderDetails = new HashSet<OrderDetail>();
        }

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

        public virtual ICollection<CategoryBook> CategoryBooks { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
