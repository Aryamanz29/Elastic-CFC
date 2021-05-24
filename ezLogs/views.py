from ezLogs.serializers import DocumentSerializer
from .models import Document
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins


class DocumentAPIViewset(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
