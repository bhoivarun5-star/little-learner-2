from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Seeds initial faculty and staff test users for Little Learner'

    def handle(self, *args, **kwargs):
        staff_users = [
            {
                'username': 'faculty.leo',
                'email': 'leo@littlelearner.com',
                'password': 'password123',
                'first_name': 'Leo Vance (STEM Faculty)',
                'is_staff': True,
            },
            {
                'username': 'admin',
                'email': 'admin@littlelearner.com',
                'password': 'admin123',
                'first_name': 'Sarah Jenkins (Principal/Admin)',
                'is_staff': True,
                'is_superuser': True,
            },
            {
                'username': 'faculty.emma',
                'email': 'emma@littlelearner.com',
                'password': 'password123',
                'first_name': 'Emma Davis (Arts Faculty)',
                'is_staff': True,
            }
        ]

        for user_data in staff_users:
            username = user_data['username']
            user = User.objects.filter(username=username).first()
            if not user:
                is_super = user_data.get('is_superuser', False)
                if is_super:
                    user = User.objects.create_superuser(
                        username=username,
                        email=user_data['email'],
                        password=user_data['password'],
                        first_name=user_data['first_name']
                    )
                else:
                    user = User.objects.create_user(
                        username=username,
                        email=user_data['email'],
                        password=user_data['password'],
                        first_name=user_data['first_name'],
                        is_staff=True
                    )
                self.stdout.write(self.style.SUCCESS(f"Created staff user: {username} ({user_data['email']})"))
            else:
                user.is_staff = True
                user.first_name = user_data['first_name']
                user.set_password(user_data['password'])
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Updated staff user: {username}"))
