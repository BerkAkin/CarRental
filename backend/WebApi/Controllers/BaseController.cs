using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class BaseController : ControllerBase
    {
        protected string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);
        protected string UserTypeId => User.FindFirstValue(ClaimTypes.Role);

    }

}