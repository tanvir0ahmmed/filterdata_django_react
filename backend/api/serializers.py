from django.contrib.auth.models import User
from .models import InputData
from rest_framework import serializers

'''InputSerializer will serialize InputData model field and return 4 value'''
class InputSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = InputData
        fields = ['inp', 'created_at','owner', 'user']#
    
    def create(self, validated_data):
        user = InputData.objects.create(inp=validated_data['inp']
                                        ,user=validated_data['user'])
        return user
'''UserSerializer will serialize User model field hashing password and return id & password'''    
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