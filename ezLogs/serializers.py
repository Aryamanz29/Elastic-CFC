from rest_framework import serializers
from .models import Document, LogDetail, User


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"


class LogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogDetail
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('emailid','username','pswd_hash')

class LogSeachSerializer(serializers.Serializer):
    line = serializers.CharField()
    count = serializers.IntegerField()
