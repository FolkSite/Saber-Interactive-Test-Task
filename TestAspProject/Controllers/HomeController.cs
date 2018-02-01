using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace TestAspProject.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Hode/

        public ActionResult Index()
        {
            ViewBag.Template = System.Configuration.ConfigurationManager.AppSettings["RegexTemplate"];

            return View();
        }

    }
}
