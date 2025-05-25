
from django.urls import path
from . import views

urlpatterns = [
    path("getRecipe/", views.getRecipe, name = "getRecipe"),
    path("getAllRecipes/", views.getAllRecipes, name = "getAllRecipes"),
    path("addRecipe/", views.addRecipe, name="addRecipe"),
    path("addRecipePic/", views.addRecipePic, name = "addRecipePic"),
    path("addRecipeAudio/", views.addRecipeAudio, name = "addRecipeAudio"),
    path('addRecipeComprehensive/', views.addRecipeComprehensive, name = "addRecipeComprehensive")
    
]

