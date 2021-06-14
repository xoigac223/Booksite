﻿using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class OrderDetail
    {
        public int OrderId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }

        public virtual Book Book { get; set; }
        public virtual Order Order { get; set; }
    }
}
