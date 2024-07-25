using RecipeBook.DataAccess;
using RecipeBook.Models;

namespace RecipeBook.BusinessLogic
{
    public class RecipeBusinessLogic
    {
        public void SaveRecipe(RecipeModel recipeModel)
        {
            var dataAccess = new RecipeDataAccess();
            dataAccess.SaveRecipeToDatabase(recipeModel);
        }
    }
}
