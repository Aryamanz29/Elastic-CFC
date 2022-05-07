from django.contrib import admin
from .models import Document, LogDetail, User


admin.site.register(Document)
admin.site.register(LogDetail)
admin.site.register(User)
