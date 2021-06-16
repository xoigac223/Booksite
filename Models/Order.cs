using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime DateBill { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public float Shipping { get; set; }
        
        public byte Status { get; set; } 
        public virtual User UsernameNavigation { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
