using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class MoviesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Update(int id)
        {
            return View();
        }
    }
}
