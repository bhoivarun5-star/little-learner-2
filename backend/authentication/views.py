from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Student, StudentProgress


from django.conf import settings
import requests


def record_supabase_login(identifier, user=None, status_str="success"):
    """Record login action to Supabase database."""
    try:
        url = f"{settings.SUPABASE_URL}/rest/v1/login_records"
        headers = {
            "apikey": settings.SUPABASE_PUBLISHABLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_PUBLISHABLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
        username = getattr(user, 'username', identifier)
        email = getattr(user, 'email', '')
        display_name = getattr(user, 'first_name', username)
        role = "Faculty Instructor" if getattr(user, 'is_staff', False) else "Learner"

        payload = {
            "identifier": identifier,
            "username": username,
            "email": email or (identifier if '@' in identifier else f"{identifier}@littlelearner.com"),
            "display_name": display_name or username,
            "role": role,
            "auth_mode": "django_backend",
            "status": status_str,
            "user_agent": "Django Backend API"
        }
        requests.post(url, json=payload, headers=headers, timeout=2.5)
    except Exception:
        pass


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
        record_supabase_login(identifier, user=user, status_str="success")
        
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
        record_supabase_login(identifier, user=None, status_str="failed_credentials")
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
    record_supabase_login(username, user=user, status_str="registered")

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


def serialize_student(student):
    progress_records = [
        {
            'game_id': p.game_id,
            'game_title': p.game_title,
            'score': p.score,
            'stars': p.stars,
            'times_played': p.times_played,
            'last_played': p.last_played.isoformat() if p.last_played else None,
        }
        for p in student.progress_records.all()
    ]
    return {
        'id': student.student_id,
        'student_id': student.student_id,
        'name': student.name,
        'avatar': student.avatar,
        'grade': student.grade,
        'total_score': student.total_score,
        'total_stars': student.total_stars,
        'created_at': student.created_at.isoformat() if student.created_at else None,
        'progress': progress_records,
    }


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def students_view(request):
    """
    GET: List all students with sequential IDs and progress. Auto-seeds defaults if empty.
    POST: Create a student with teacher-provided name. Generates the next sequential unique ID.
    """
    if request.method == 'GET':
        students = Student.objects.all().prefetch_related('progress_records')
        if not students.exists():
            seed_data = [
                ('Aarav Sharma', 'Kindergarten'),
                ('Ananya Patil', 'Grade 1'),
                ('Rohan Joshi', 'Pre-K'),
                ('Meera Nair', 'Kindergarten')
            ]
            created_students = []
            for name, grade in seed_data:
                sid = Student.generate_next_student_id()
                s = Student.objects.create(
                    student_id=sid,
                    name=name,
                    grade=grade,
                    total_score=0,
                    total_stars=0,
                    avatar='/assets/boy-avatar.jpg'
                )
                created_students.append(s)
            students = created_students

        return Response({
            'success': True,
            'students': [serialize_student(s) for s in students]
        }, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        name = request.data.get('name', '').strip()
        if not name:
            return Response({'error': 'Student name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        grade = request.data.get('grade', 'Kindergarten').strip()
        avatar = request.data.get('avatar', '/assets/boy-avatar.jpg')
        
        # Generate sequential unique student ID (STU-001, STU-002, ...)
        student_id = Student.generate_next_student_id()
        
        student = Student.objects.create(
            student_id=student_id,
            name=name,
            grade=grade,
            avatar=avatar,
            created_by=request.user if request.user.is_authenticated else None
        )

        return Response({
            'success': True,
            'message': f'Student "{student.name}" added with sequential ID {student.student_id}!',
            'student': serialize_student(student)
        }, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def student_detail_view(request, student_id):
    """
    GET: Retrieve specific student.
    PUT: Update student name / grade manually by teacher.
    DELETE: Remove student.
    """
    student = Student.objects.filter(student_id__iexact=student_id).first()
    if not student:
        return Response({'error': f'Student with ID {student_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response({'success': True, 'student': serialize_student(student)}, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        name = request.data.get('name', '').strip()
        if name:
            student.name = name
        if 'grade' in request.data:
            student.grade = request.data['grade'].strip()
        if 'avatar' in request.data:
            student.avatar = request.data['avatar']
        
        student.save()
        return Response({
            'success': True,
            'message': f'Student {student.student_id} updated successfully!',
            'student': serialize_student(student)
        }, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        name = student.name
        student.delete()
        return Response({
            'success': True,
            'message': f'Student {name} ({student_id}) removed successfully.'
        }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def record_progress_view(request, student_id):
    """
    Record game score and stars for the specified student ID.
    Updates the student's cumulative score and stars, and specific game record.
    """
    student = Student.objects.filter(student_id__iexact=student_id).first()
    if not student:
        return Response({'error': f'Student with ID {student_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

    game_id = request.data.get('game_id', 'general')
    game_title = request.data.get('game_title', game_id)
    score_delta = int(request.data.get('score', 0))
    stars_delta = int(request.data.get('stars', 0))

    # Update per-game progress
    prog, created = StudentProgress.objects.get_or_create(
        student=student,
        game_id=game_id,
        defaults={'game_title': game_title, 'score': score_delta, 'stars': stars_delta, 'times_played': 1}
    )
    if not created:
        prog.score += score_delta
        prog.stars += stars_delta
        prog.times_played += 1
        if game_title:
            prog.game_title = game_title
        prog.save()

    # Accurately calculate total stars and score directly from all game records
    student.total_stars = sum(p.stars for p in student.progress_records.all())
    student.total_score = sum(p.score for p in student.progress_records.all())
    student.save()

    return Response({
        'success': True,
        'message': f'Progress recorded for {student.name} ({student.student_id})!',
        'student': serialize_student(student)
    }, status=status.HTTP_200_OK)
