from django.http import HttpResponse
from django.shortcuts import render
from .models import Post
# Create your views here.

def hello_world(request):
    return HttpResponse("hello world")

def posts_list(request):

    posts = Post.objects.all()

    return render(request,'blog/post/list.html',{'posts':posts})

def post_detail(request,id):
    post = Post.objects.get(id=id)

    return render(request,'blog/post/detail.html',{'post': post})
