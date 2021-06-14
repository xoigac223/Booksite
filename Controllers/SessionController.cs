using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        [HttpGet("get")]
        public IActionResult GetSession()
        {
            var sessionData = HttpContext.Session.GetString("user");
            return Ok(sessionData);
        }
    }
}