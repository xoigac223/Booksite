using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class Category
    {
        public Category()
        {
            CategoryBooks = new HashSet<CategoryBook>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<CategoryBook> CategoryBooks { get; set; }
    }
}
