import django_filters

from .models import InputLine


class InputLineFilter(django_filters.FilterSet):

    class Meta:
        model = InputLine
        fields = ('title', 'author', 'speak', )
