from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint to verify backend connectivity."""
    return Response({
        'status': 'online',
        'message': 'Little Learner Backend is running happily! 🌟',
        'version': '1.0.0',
        'features': ['auth', 'gamification', 'offline-ready-api']
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login endpoint supporting either username or email.
    """
    identifier = request.data.get('identifier', '').strip()
    password = request.data.get('password', '').strip()
    remember_me = request.data.get('remember_me', False)

    if not identifier or not password:
        return Response({
            'error': 'Please provide both username/email and password.'
        }, status=status.HTTP_400_BAD_REQUEST)

    # Resolve username if email was provided
    target_username = identifier
    user_by_email = User.objects.filter(email__iexact=identifier).first()
    if user_by_email:
        target_username = user_by_email.username

    user = authenticate(request, username=target_username, password=password)

    if user is not None:
        login(request, user)
        
        # Determine friendly display name
        display_name = user.first_name if user.first_name else user.username
        role_title = "Faculty Instructor" if user.is_staff else "Learner"
        
        return Response({
            'success': True,
            'message': f'Welcome back, {display_name}! 🎓',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'display_name': display_name,
                'role': role_title,
                'is_staff': True,
                'department': 'Early Education & STEM',
                'avatar': '/assets/boy-avatar.jpg',
                'assigned_students': 24,
                'active_courses': 4,
                'stars': 250,
                'streak_days': 12,
                'current_level': 'Certified Educator'
            },
            'token': f'll-session-token-{user.id}-authenticated'
        }, status=status.HTTP_200_OK)
    else:
        # Check if user exists to provide helpful message
        exists = User.objects.filter(Q(username__iexact=identifier) | Q(email__iexact=identifier)).exists()
        if exists:
            return Response({
                'error': 'Incorrect password. Please double check and try again.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'error': f'No account found with username/email "{identifier}". Try signing up!'
            }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    Register a new learner or parent account.
    """
    username = request.data.get('username', '').strip()
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '').strip()
    display_name = request.data.get('display_name', '').strip()

    if not username or not password:
        return Response({
            'error': 'Username and password are required.'
        }, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username__iexact=username).exists():
        return Response({
            'error': 'This username is already taken. Please choose another fun name!'
        }, status=status.HTTP_400_BAD_REQUEST)

    if email and User.objects.filter(email__iexact=email).exists():
        return Response({
            'error': 'An account with this email already exists. Please log in instead.'
        }, status=status.HTTP_400_BAD_REQUEST)

    department = request.data.get('department', 'Early Childhood Education').strip()
    
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=display_name or username,
        is_staff=True
    )
    login(request, user)

    return Response({
        'success': True,
        'message': f'Hooray! Faculty account created successfully. Welcome, {user.first_name}!',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'display_name': user.first_name,
            'role': 'Faculty Member',
            'is_staff': True,
            'department': department,
            'avatar': '/assets/boy-avatar.jpg',
            'assigned_students': 0,
            'active_courses': 1,
            'stars': 100,
            'streak_days': 1,
            'current_level': 'New Educator'
        },
        'token': f'll-session-token-{user.id}-authenticated'
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def social_login_view(request):
    """
    Mock social login handler for Google, Apple, and Facebook.
    Seamlessly creates or signs in a learner with social profile.
    """
    provider = request.data.get('provider', 'Google')
    
    # Generate or retrieve a social user
    social_username = f"{provider.lower()}_learner"
    user, created = User.objects.get_or_create(
        username=social_username,
        defaults={
            'first_name': f'Happy {provider} Learner',
            'email': f'{social_username}@example.com'
        }
    )
    if created:
        user.set_password('socialpassword123')
        user.save()

    login(request, user)

    return Response({
        'success': True,
        'message': f'Signed in via {provider} successfully! 🎉',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'display_name': user.first_name,
            'avatar': '/assets/boy-avatar.png',
            'stars': 150,
            'streak_days': 7,
            'current_level': 'Super Explorer',
            'badges': ['Social Star', 'Early Bird']
        },
        'token': f'll-social-token-{provider.lower()}-{user.id}'
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def logout_view(request):
    """Logout endpoint."""
    logout(request)
    return Response({'success': True, 'message': 'Logged out safely. See you next time!'})
