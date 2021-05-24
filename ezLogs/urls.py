from .views import DocumentAPIViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("document", DocumentAPIViewset)

urlpatterns = []
urlpatterns += router.urls
