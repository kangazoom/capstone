# from rest_framework.decorators import api_view
# from rest_framework.response import Response

from rest_framework import viewsets, authentication, permissions, filters
# from django-filters.rest_framework import DjangoFilterBackend


from .models import InputLine
from .serializers import InputLineSerializer

# Create your views here.
# @api_view(['get'])
# def fetch_input_lines(request):
#     #fetch all the input line objects
#     input_lines = InputLine.objects.all()
#     #serialize the input lines
#     serializer = InputLineSerializer(input_lines, many=True)
#
#     #return Response using rest_framework's response
#     return Response(serializer.data)

class DefaultsMixin(object):
    """Default settings for view authentication, permissions,
    filtering and pagination."""

    #     filter_backends = (                                                     2
    #     filters.DjangoFilterBackend,
    #     filters.SearchFilter,
    #     filters.OrderingFilter,
    # )

    # authentication_classes = (
    #     authentication.BasicAuthentication,
    #     authentication.TokenAuthentication,
    # )
    # permission_classes = (
    #     permissions.IsAuthenticated,
    # )
    # paginate_by = 25
    # paginate_by_param = 'page_size'
    # max_paginate_by = 100

class InputLineViewset(DefaultsMixin, viewsets.ModelViewSet):
    # api endpoint for listing and creating input lines [crud]

    queryset = InputLine.objects.all()
    serializer_class = InputLineSerializer
    # filter_backends = (DjangoFilterBackend)
    # filter_fields = ('title', 'speaking_character')
