from django.db import Error
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

    
@api_view(["POST"])
def addRecipePic(request):
    #get the id for the recipe
    # req_body = json.loads(request.body.decode('utf-8'))
    
    #everywhere else the id is passed as JSON, but here it is passed
    #as form data, along with the image file
    id = request.POST.get('id')
    
    # id = req_body['id']

    try:
        recipe = Recipe.objects.get(id = id)
    except:
        return Response({"message":"invalid id, recipe not found"}, status=status.HTTP_404_NOT_FOUND)
    
    print(recipe.title)
    
    #add the image file to the image parameter??
    #read pic from reqeust.FILES
    try:
        pic = request.FILES['pic']
    except:
        return Response({"message":"pic field not found"}, status=status.HTTP_404_NOT_FOUND)
    
    print(pic)
    
    data = {"pic":pic}
    
    serializer = RecipeSerializer(recipe, data = data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    
    else:
        return Response({"message":"Something broke"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    #???? profit
    
    #image file be passed as form data
    
@api_view(["POST"])
def addRecipeAudio(request):
    
    #get the recipe id from the form request
    
    id = request.POST.get('id')
    
    try:
        recipe = Recipe.objects.get(id = id)
        # print("ass")
    except:
        return Response({"message":"invalid id, recipe not found"}, status=status.HTTP_404_NOT_FOUND)

    print(recipe.title)

    #proceed to add the audio to recipe serialiser and object
    try:
        audio = request.FILES['audio']
    except:
        return Response({"message":"audio field not found"}, status=status.HTTP_404_NOT_FOUND)
       
    #should probably validate the audio file here somewhere
    
    print(audio)
    
    data = {"audio":audio}
    
    serializer = RecipeSerializer(recipe, data= data, partial = True)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"audio saved successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"message":"serialization failed"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    