from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiResponse
from drf_spectacular.helpers import forced_singular_serializer

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status

from user_management.serializers import LoginSerializer, LoginResponseSerializer, UserSerializer


@extend_schema_view(
    create=extend_schema(
        summary='Login into the application',
        description='Endpoint used to authenticate towards the server and retrive the API Token to be used in all other requests',
        request=LoginSerializer,
        responses={
            200: LoginResponseSerializer,
            400: OpenApiResponse(description='Bad request')
        },
    )
)
class LoginView(ViewSet):

    permission_classes = [AllowAny]

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user: User = authenticate(username=username, password=password)

        if user:
            
            if not user.is_active:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token' : token.key,
                'user': {
                    'username': user.username,
                    'firstName': user.first_name,
                    'lastName': user.last_name
                }
            }, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(
    list=extend_schema(
        summary='Logout of the application',
        description='Endpoint used to logout',
        responses={
            204: OpenApiResponse(description='Success / No content'),
            401: OpenApiResponse(description='Unauthorized'),
        },
    )
)
class LogoutView(ViewSet):

    permission_classes = [IsAuthenticated]

    def list(self, request):
        try:
            token = Token.objects.get(user=request.user)
            if token:
                token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            pass

        return Response(status=status.HTTP_401_UNAUTHORIZED)


@extend_schema_view(
    list=extend_schema(
        summary='Current logged in user',
        description='Resturns the current logged in user',
        responses={
            200: forced_singular_serializer(UserSerializer),
            401: OpenApiResponse(description='Unauthorized'),
        },
    )
)
class MeView(ViewSet):

    permission_classes = [IsAuthenticated]

    def list(self, request):
        user: User = request.user
        if user.is_anonymous:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({
            'username': user.username,
            'firstName': user.first_name,
            'lastName': user.last_name
        }, status=status.HTTP_200_OK)
