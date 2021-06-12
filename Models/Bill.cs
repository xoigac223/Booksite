using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class Bill
    {
        public Bill()
        {
            BillDetails = new HashSet<BillDetail>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime DateBill { get; set; }
        public string Address { get; set; }

        public virtual User UsernameNavigation { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
    }
}
