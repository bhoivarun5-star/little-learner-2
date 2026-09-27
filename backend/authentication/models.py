from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    # Unique sequential ID format, e.g., 'STU-001'
    student_id = models.CharField(max_length=20, unique=True, db_index=True)
    name = models.CharField(max_length=150)
    avatar = models.CharField(max_length=255, default='/assets/boy-avatar.jpg')
    grade = models.CharField(max_length=50, default='Kindergarten')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='students')
    total_score = models.IntegerField(default=0)
    total_stars = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['student_id']

    def __str__(self):
        return f"{self.student_id} - {self.name}"

    @classmethod
    def generate_next_student_id(cls):
        """
        Generates sequential unique student ID like STU-001, STU-002, etc.
        """
        all_ids = cls.objects.values_list('student_id', flat=True)
        max_num = 0
        for sid in all_ids:
            if sid.startswith('STU-'):
                try:
                    num = int(sid.split('-')[1])
                    if num > max_num:
                        max_num = num
                except (ValueError, IndexError):
                    pass
        next_num = max_num + 1
        return f"STU-{next_num:03d}"


class StudentProgress(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='progress_records')
    game_id = models.CharField(max_length=100) # e.g. 'alphabet-phonics', 'count-match', etc.
    game_title = models.CharField(max_length=150, blank=True, default='')
    score = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)
    times_played = models.IntegerField(default=1)
    last_played = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'game_id')
        ordering = ['-last_played']

    def __str__(self):
        return f"{self.student.student_id} - {self.game_id}: score={self.score}, stars={self.stars}"
