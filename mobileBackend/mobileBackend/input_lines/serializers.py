from rest_framework.serializers import ModelSerializer
from .models import InputLine

class InputLineSerializer(ModelSerializer):
    class Meta:
        model = InputLine
        fields = '__all__'
