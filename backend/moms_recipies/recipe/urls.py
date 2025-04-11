
from django.urls import path
from . import views

urlpatterns = [
    path("getRecipe/", views.getRecipe, name = "getRecipe"),
    path("getAllRecipes/", views.getAllRecipes, name = "getAllRecipes"),
    
]

