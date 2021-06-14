using System;
using System.Collections.Generic;

#nullable disable

namespace BookShop.Models
{
    public partial class User
    {
        public User()
        {
            Bills = new HashSet<Bill>();
        }

        public string Username { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }
}
