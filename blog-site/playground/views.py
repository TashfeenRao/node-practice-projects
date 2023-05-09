from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.generic import ListView
from django.core.mail import send_mail
from playground.forms import EmailPostForm
from .models import Post
# Create your views here.


class PostListView(ListView):
    queryset = posts_list = Post.objects.all().filter(status=Post.Status.PUBLISHED)
    context_object_name = 'posts'
    paginate_by = 3
    template_name = "blog/post/list.html"


def post_share(request, post_id):
    sent = False
    post = get_object_or_404(Post, id=post_id)
    post_url = request.build_absolute_uri(post.get_absolute_url())

    if request.method == 'POST':
        form = EmailPostForm(request.POST)

        if form.is_valid():
            cd = form.cleaned_data
            # send email
            subject = f"{cd['name']} recommends you to read {post.title}"
            message = f"Read {post.title} at {post_url}"

            send_mail(subject, message, 'tashfeen@ricult.com', [cd['to']],
                      )
            sent = True

    else:
        form = EmailPostForm()

    return render(request, 'blog/post/share.html',
                  {"post": post, "form": form, "sent": sent})


def posts_list(request):
    posts_list = Post.objects.all().filter(status=Post.Status.PUBLISHED)

    paginator = Paginator(posts_list, 3)
    page_num = request.GET.get('page', 1)
    try:
        posts = paginator.page(page_num)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.page_num)
    return render(request, 'blog/post/list.html', {'posts': posts})


def post_detail(request, year, month, day, post):
    post = get_object_or_404(Post, status=Post.Status.PUBLISHED,
                             publish__year=year, publish__month=month, publish__day=day, slug=post)

    return render(request, 'blog/post/detail.html', {'post': post})
