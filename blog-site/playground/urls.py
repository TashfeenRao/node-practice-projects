from django.urls import path
from . import views


app_name = 'blog'

urlpatterns = [
    path('hello-world/',views.hello_world),
    path('',views.posts_list,name='post_lists'),
    path('<int:year>/<int:month>/<int:day>/<slug:post>',views.post_detail,name='post_detail'),
]
