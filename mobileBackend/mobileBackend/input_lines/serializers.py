from rest_framework.serializers import ModelSerializer
from .models import InputLine

# from django.contrib.auth import get_user_model
from rest_framework.reverse import reverse
# import django_filters

class InputLineSerializer(ModelSerializer):
    class Meta:
        model = InputLine
        fields = ('id', 'title', 'author', 'description', 'speaking_character', 'user_character', 'line_text')

    def get_status_display(self, obj):
        return obj.get_status_display()
