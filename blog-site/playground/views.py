from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator
from .models import Post
# Create your views here.

def hello_world(request):
    return HttpResponse("hello world")

def posts_list(request):
    posts_list = Post.objects.all().filter()

    paginator = Paginator(posts_list,3)
    page_num = request.GET.get('page',1)
    posts = paginator.page(page_num)
    return render(request,'blog/post/list.html',{'posts':posts})

def post_detail(request,year,month,day,post):
    post = get_object_or_404(Post, publish__year=year, publish__month=month, publish__day=day, slug=post)

    return render(request,'blog/post/detail.html',{'post': post})
