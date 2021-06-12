using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class CategoryBook
    {
        public int Category { get; set; }
        public int Book { get; set; }

        public virtual Book BookNavigation { get; set; }
        public virtual Category CategoryNavigation { get; set; }
    }
}
