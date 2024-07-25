using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RecipeBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Recipe : ControllerBase
    {
        public IActionResult AddNewRecipe(RecipeModel recipeModel)
        {
            var businessLogic = new recipeBusinessLogic();
            businessLogic.SaveRecipe(recipeModel);
            return Ok();
        }
    }
}
