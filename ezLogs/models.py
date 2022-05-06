from django.db import models


class User(models.Model):
    username = models.CharField(blank=False, null=False, unique=True, max_length=200)
    pswd_hash = models.CharField(blank=False, null=False, unique=True, max_length=500)
    emailid = models.EmailField(blank=False, null=False, unique=True, max_length=200)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} & {self.emailid}"


class Document(models.Model):
    name = models.CharField(max_length=255, blank=True)
    log_file = models.FileField(upload_to="logs/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class LogDetail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    logfile = models.ForeignKey(Document, on_delete=models.CASCADE)
    line = models.TextField(blank=True, null=True)
    count = models.BigIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.logfile.name} line - {self.count}"

    class Meta:
        ordering = ["count"]
