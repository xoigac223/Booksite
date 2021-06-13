using System;
using System.Linq;
using BookShop.Models;
using Microsoft.Extensions.Options;
using Sieve.Models;
using Sieve.Services;

namespace BookShop.Service
{
    public class ApplicationSieveProcessor : SieveProcessor
    {
        
        public ApplicationSieveProcessor(IOptions<SieveOptions> options)
            : base(options)
        {
        }
        
        protected override SievePropertyMapper MapProperties(SievePropertyMapper mapper)
        {
            mapper.Property<CategoryBook>(e => e.Category)
                .CanFilter()
                .HasName("category");

            mapper.Property<CategoryBook>(e => e.BookNavigation.Price)
                .CanFilter()
                .CanSort()
                .HasName("price");
            
            mapper.Property<CategoryBook>(e => e.BookNavigation.Name)
                .CanFilter()
                .HasName("name");
            
            return mapper;
        }
    }
}