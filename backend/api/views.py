from django.shortcuts import render
from rest_framework.views import APIView
from .models import InputData
from django.contrib.auth.models import User
from .serializers import InputSerializer, UserSerializer, LogInSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.http import QueryDict
from django.http import Http404
from rest_framework import status,viewsets
from django.contrib.auth import authenticate


# Create your views here.
class InputView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=(TokenAuthentication,)
    
    def get_data(self,key,request):
        user_id = Token.objects.get(key=key).user_id
        inp = request.data.get('inp')
        data = {'inp':inp,'user':user_id}
        query_dict = QueryDict('', mutable=True)
        query_dict.update(data)
        return query_dict
    
    def get_object(self, pk):
        try:
            return InputData.objects.get(pk=pk)
        except InputData.DoesNotExist:
            raise Http404
    
    def get(self, request):
        user_id = Token.objects.get(key=self.request.auth.key).user_id
        article = InputData.objects.filter(user=user_id)
        serializer = InputSerializer(article, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = self.get_data(self.request.auth.key,request)
        serializer = InputSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InputAllView(APIView):
    
    def get(self, request):
        article = InputData.objects.all()
        serializer = InputSerializer(article, many=True)
        return Response(serializer.data)
    
    
class InputDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk,start_date,end_date):
        try:
            if start_date=="" and end_date=="":
                return InputData.objects.filter(user=pk)
            else: 
                return InputData.objects.filter(user=pk,created_at__range=[start_date,end_date])
        except InputData.DoesNotExist:
            raise Http404

    def get(self, request, pk,st="",ed="", format=None):
        #2021-09-02T20:10:00Z 2021-09-02T20:10:00Z
        start_date =""
        end_date =""
        if st != "no-date" and ed != "no-date":
            stDate = st.split("T")
            a = stDate[1].replace('-',':')
            start_date = stDate[0]+'T' + a
            
            edDate = ed.split("T")
            a = edDate[1].replace('-',':')
            end_date = edDate[0]+'T' + a
        #print("@@@@@@@@@ ",st,ed)
        snippet = self.get_object(pk,start_date,end_date)
        serializer = InputSerializer(snippet, many=True)
        return Response(serializer.data)
    

class AllDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return InputData.objects.filter(user=pk)
        except InputData.DoesNotExist:
            raise Http404

    def get(self, request, pk=0,st="",ed="", format=None):
        snippet = self.get_object(pk)
        serializer = InputSerializer(snippet, many=True)
        return Response(serializer.data)

  
class UserViewSet(viewsets.ModelViewSet):
    authentication_classes=(TokenAuthentication,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

    
class LogInViewSet(APIView):
    authentication_classes=(TokenAuthentication,)
    def post(self, request, format=None):
        user = authenticate(username=request.data.get('username'),
                                password=request.data.get('password'))
        if user:
            token = Token.objects.create(user=user)
            return Response({'username':user.username, 'id':user.id, 'token':token.key}, status=status.HTTP_201_CREATED)
        
        return Response({'error':'username or password is not match'}, status=status.HTTP_400_BAD_REQUEST)
    
class LogOutViewSet(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=(TokenAuthentication,)
    def get(self, request):
        request.user.auth_token.delete()
        return Response({'massege':'successfully logout'},status=status.HTTP_200_OK)
    
  