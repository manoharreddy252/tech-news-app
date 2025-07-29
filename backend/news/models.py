from django.db import models
from django.contrib.auth.models import User

class NewsArticle(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()
    url = models.URLField()
    source = models.CharField(max_length=100)
    published_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-published_date']
        
    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"