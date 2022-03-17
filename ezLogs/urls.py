from django.urls import path
from .views import DocumentAPIViewset, some_log_lines, CreateUserView, LogSearchView, IsAuthenticatedView, VerifiedView, UserView, LoginView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("document", DocumentAPIViewset)

urlpatterns = [
    path("get-some-log-lines/<int:id>/", some_log_lines, name="log_lines"),
    path("search/", LogSearchView.as_view()),
    path("is-auth/", IsAuthenticatedView.as_view()),
    path("create-user/", CreateUserView.as_view()),
    path("verified/", VerifiedView.as_view()),
    path("user/", UserView.as_view()),
    path("login/", LoginView.as_view()),
]
urlpatterns += router.urls
