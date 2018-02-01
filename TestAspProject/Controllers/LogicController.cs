using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace TestAspProject.Controllers
{
    public class LogicController : Controller
    {
        [HttpPost]
        public JsonResult Parse(string input)
        {
            try
            {
                Thread.Sleep(new Random().Next(1, 5) * 1000);
                return Json(new
                {
                    Text = input,
                    IsValid = new Regex(ConfigurationManager.AppSettings["RegexTemplate"]).IsMatch(input)
                }, JsonRequestBehavior.AllowGet);
                
            }
            catch (Exception e)
            {
                return Json(new
                {
                    IsValid = false,
                    e.Message
                }, JsonRequestBehavior.AllowGet);

            }
        }
    }
}