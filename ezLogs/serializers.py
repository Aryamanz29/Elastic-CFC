from rest_framework import serializers
from .models import Document, LogDetail


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"


class LogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogDetail
        fields = "__all__"
