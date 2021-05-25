from django_elasticsearch_dsl import Document, fields
from .models import LogDetail, Document as DocumentModel
from django_elasticsearch_dsl.registries import registry


@registry.register_document
class LogDetailDocument(Document):

    id = fields.IntegerField(attr="id")
    logfile = fields.ObjectField(
        properties={
            "name": fields.TextField(),
            "log_file": fields.FileField(),
        }
    )

    class Index:
        name = "log_detail"
        settings = {"number_of_shards": 1, "number_of_replicas": 0}

    class Django:

        model = LogDetail
        fields = [
            "line",
            "count",
        ]
        related_models = [DocumentModel]

    def get_instances_from_related(self, related_instance):
        """If related_models is set, define how to retrieve the Car instance(s) from the related model.
        The related_models option should be used with caution because it can lead in the index
        to the updating of a lot of items.
        """
        if isinstance(related_instance, Document):
            return related_instance.logdetail_set.all()
