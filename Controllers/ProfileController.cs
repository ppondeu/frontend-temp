using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Update()
        {
            return View();
        }

        public IActionResult FavMovies()
        {
            return View();
        }
        public IActionResult Groups()
        {
            return View();
        }
    }
}
