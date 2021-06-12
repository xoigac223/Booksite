using BookShop.DTO;
using BookShop.Models;

namespace BookShop.Service
{
    public class BookToBookDto
    {
        public static BookDto convert(Book book)
        {
            BookDto bookDto = new BookDto();
            bookDto.Author = book.Author;
            bookDto.Description = book.Description;
            bookDto.Details = book.Details;
            bookDto.Id = book.Id;
            bookDto.Name = book.Name;
            bookDto.Pages = book.Pages;
            bookDto.Price = book.Price;
            bookDto.Publisher = book.Publisher;
            bookDto.PublishingYear = book.PublishingYear;
            bookDto.Status = book.Status;
            return bookDto;
        }
    }
}