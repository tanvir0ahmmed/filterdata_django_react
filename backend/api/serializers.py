from django.contrib.auth.models import User
from .models import InputData
from rest_framework import serializers

class InputSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = InputData
        fields = ['inp', 'created_at','owner', 'user']#
    
    def create(self, validated_data):
        user = InputData.objects.create(inp=validated_data['inp']
                                        ,user=validated_data['user'])
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        
        extra_kwargs = {
            'password':{
                'write_only': True,
                'required':True,
            }
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class LogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        #''' 
        extra_kwargs = {
            'password':{
                'write_only': True,
                'required':True,
            }
        } 