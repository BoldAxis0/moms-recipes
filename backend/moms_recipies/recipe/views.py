from django.shortcuts import render
from .models import Recipe
import requests
from .serializers import RecipeSerializer
import json
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


# Create your views here.
@api_view(["GET"])
def getRecipe(request):
    
#extract recipe id from the json package
    req_body = json.loads(request.body.decode("utf-8"))
    id = req_body['id']

#search db with the provided id
    recipe = Recipe.objects.get(id = id)
    
    if not recipe:
        return Response({"message":"Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
    
    print(recipe)
    #serialise and return the found object
    serializer = RecipeSerializer(recipe)
    
    return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(["GET"])
def getAllRecipes(request):
    
    recipes = Recipe.objects.all()
    
    if not recipes:
        return Response({"message: No Recipes Found"}, status = status.HTTP_404_NOT_FOUND)
    
    serializer = RecipeSerializer(recipes, many = True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def addRecipe(request):
    
    #add a recipe
    #get all recipe info from the request object
    req_body = json.loads(request.body.decode('utf-8'))
    title = req_body["title"]
    desc = req_body["description"]
    
    data = {
        "title": title,
        "description":desc 
    }
    
    
    serializer = RecipeSerializer(data=data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": f"New Recipe saved successfully: {title}"}, status=status.HTTP_200_OK)
    else:
        
        return Response({"message":"Recipe creation failed"}, status=status.HTTP_400_BAD_REQUEST)

    