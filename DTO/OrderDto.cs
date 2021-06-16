using System;

namespace BookShop.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime DateBill { get; set; }
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public float Shipping { get; set; }
        public byte Status { get; set; }
        public float  Total { get; set; }
    }
}