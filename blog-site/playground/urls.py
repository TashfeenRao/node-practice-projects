from django.urls import path
from . import views


app_name = 'blog'

urlpatterns = [
    # path('', views.PostListView.as_view(), name='post_lists'),
    path('', views.posts_list, name='post_lists'),
    path('tag/<slug:tag_slug>', views.posts_list, name='post_lists_with_tag'),
    path('<int:year>/<int:month>/<int:day>/<slug:post>',
         views.post_detail, name='post_detail'),
    path('<int:post_id>/share', view=views.post_share, name='post_share'),
    path('<int:post_id>/comment', view=views.add_comment, name='add_comment')
]
