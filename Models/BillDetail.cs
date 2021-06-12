using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class BillDetail
    {
        public int BillId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }

        public virtual Bill Bill { get; set; }
        public virtual Book Book { get; set; }
    }
}
