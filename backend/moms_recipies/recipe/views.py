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
    id = request.GET.get('id')

#search db with the provided id
    recipe = Recipe.objects.filter(id = id)
    
    if not recipe:
        return Response({"message":"Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
    

#serialise and return the found object
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data, status=status.HTTP_200_OK)
