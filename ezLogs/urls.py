from django.urls import path
from .views import DocumentAPIViewset, some_log_lines, LogSearchView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("document", DocumentAPIViewset)

urlpatterns = [
    path("get-some-log-lines/<int:id>/", some_log_lines, name="log_lines"),
    path("search/", LogSearchView.as_view()),
]
urlpatterns += router.urls
