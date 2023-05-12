from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.generic import ListView
from django.views.decorators.http import require_POST
from django.core.mail import send_mail
from playground.forms import EmailPostForm, CommentForm
from .models import Post
from django.db.models import Count
from taggit.models import Tag
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


def posts_list(request, tag_slug=None):
    posts_list = Post.objects.all().filter(status=Post.Status.PUBLISHED)
    tag = None
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        posts_list = posts_list.filter(tags__in=[tag])

    paginator = Paginator(posts_list, 3)
    page_num = request.GET.get('page', 1)
    try:
        posts = paginator.page(page_num)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.page_num)
    return render(request, 'blog/post/list.html', {'posts': posts, 'tag': tag})


def post_detail(request, year, month, day, post):
    post = get_object_or_404(Post, status=Post.Status.PUBLISHED,
                             publish__year=year, publish__month=month, publish__day=day, slug=post)

    comments = post.comments.filter(active=True)
    form = CommentForm()

    post_tag_ids = post.tags.values_list('id', flat=True)
    similer_posts = Post.published.filter(
        tags__in=post_tag_ids).exclude(id=post.id)
    similer_posts = similer_posts.annotate(same_tags=Count(
        'tags')).order_by('-same_tags', '-publish')[:4]

    return render(request, 'blog/post/detail.html', {'post': post, "comments": comments, "form": form,
                                                     "similer_posts": similer_posts})


@require_POST
def add_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    comment = None
    form = CommentForm(data=request.POST)

    if form.is_valid():

        comment = form.save(commit=False)

        comment.post = post
        comment.save()

    return render(request, 'blog/post/comment.html', {"post": post, "comment": comment, "form": form})
