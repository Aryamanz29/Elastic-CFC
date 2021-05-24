from django.db import models


class Document(models.Model):
    name = models.CharField(max_length=255, blank=True)
    log_file = models.FileField(upload_to="logs/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
