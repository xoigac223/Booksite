using BookShop.DTO;
using BookShop.Models;

namespace BookShop.Service
{
    public class BookFromDtoToBook
    {
        public static Book Convert(BookFormDto bookFormDto)
        {
            Book book = new Book();
            book.Author = bookFormDto.Author;
            book.Description = bookFormDto.Description;
            book.Details = bookFormDto.Details;
            book.Id = bookFormDto.Id;
            book.Name = bookFormDto.Name;
            book.Pages = bookFormDto.Pages;
            book.Price = bookFormDto.Price;
            book.Publisher = bookFormDto.Publisher;
            book.Status = bookFormDto.Status;
            book.PublishingYear = bookFormDto.PublishingYear;
            return book;
        }
    }
}