from .models import InputLine
from rest_framework.decorators import api_view
from .serializers import InputLineSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(['get'])
def fetch_input_lines(request):
    #fetch all the input line objects
    input_lines = InputLine.objects.all()
    #serialize the input lines
    serializer = InputLineSerializer(input_lines, many=True)

    #return Response using rest_framework's response
    return Response(serializer.data)
