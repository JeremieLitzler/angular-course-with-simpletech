from rest_framework import serializers


class UserSerializer(serializers.Serializer):

    username = serializers.CharField()
    firstName = serializers.CharField()
    lastName = serializers.CharField()


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()


class LoginResponseSerializer(serializers.Serializer):
    
    token = serializers.CharField()
    user = UserSerializer()