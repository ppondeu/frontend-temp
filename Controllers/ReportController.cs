using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class ReportController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
