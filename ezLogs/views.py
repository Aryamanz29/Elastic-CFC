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
from .documents import LogDetailDocument
from rest_framework.views import APIView


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

        # http://localhost:8000/api/document/

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        create_log_detail(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


def some_log_lines(request, id):

    # http://localhost:8000/api/get-some-log-lines/<FILE_ID>/

    doc = get_object_or_404(Document, pk=id)
    logs = LogDetail.objects.filter(logfile=doc)[:10]
    data = LogDetailSerializer(logs, many=True).data
    return JsonResponse(data, safe=False)


class LogSearchView(APIView):

    # http://localhost:8000/api/search/?q=<SEARCH_KEYWORD>&file_id=<File_ID>

    def get(self, request, *args, **kwargs):
        search_query = request.query_params.get("q", "")
        log_file_id = request.query_params.get("file_id", None)
        doc = Document.objects.filter(id=log_file_id).first()
        # print(search_query)
        search = LogDetailDocument.search().filter("match", line=search_query)
        final_res = []
        for res in search:
            # print(res.id, res.logfile)
            logfile = res.logfile
            # print(logfile, type(logfile))
            # print(logfile['name'] == doc.name, logfile['log_file'] == doc.log_file.url, doc.log_file.url)
            if logfile["name"] == doc.name and logfile["log_file"] == doc.log_file.url:
                final_res.append({"line": res.line, "count": res.count})
        return Response(final_res, status=status.HTTP_200_OK)
