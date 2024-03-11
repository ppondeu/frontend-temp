using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class RoomController : Controller
    {
        public IActionResult Create()
        {
            return View();
        }
    }
}
