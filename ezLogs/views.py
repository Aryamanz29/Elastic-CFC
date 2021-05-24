from django.http.response import JsonResponse
from ezLogs.serializers import DocumentSerializer, LogDetailSerializer
from .models import Document, LogDetail
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from os import path
from celery import shared_task
from django.shortcuts import get_object_or_404


@shared_task
def create_log_detail(data):
    doc = Document.objects.get(pk=data.get("id"))
    log_file_path = path.join(settings.MEDIA_ROOT, doc.log_file.name)
    print(log_file_path)
    with open(log_file_path, "r") as f:
        ls = f.readlines()
    for index, line in enumerate(ls):
        obj = LogDetail(logfile=doc, line=line.strip(), count=index + 1)
        obj.save()


class DocumentAPIViewset(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        create_log_detail.delay(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


def some_log_lines(request, id):
    doc = get_object_or_404(Document, pk=id)
    logs = LogDetail.objects.filter(logfile=doc)[:10]
    data = LogDetailSerializer(logs, many=True).data
    return JsonResponse(data, safe=False)
