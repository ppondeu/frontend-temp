using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class AdminReportsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
