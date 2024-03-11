using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class AuthController : Controller
    {

        public IActionResult Signin()
        {
            return View();
        }

        public IActionResult Signup()
        {
            return View();
        }
    }
}
