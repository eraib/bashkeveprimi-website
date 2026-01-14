# Django Backend Setup Guide - Bashkeveprimi

This guide provides step-by-step instructions for setting up the Django backend for the Bashkeveprimi humanitarian platform.

## Prerequisites

- Python 3.11 or higher
- PostgreSQL 14+ (or MySQL 8+)
- Redis (for Celery and caching)
- Git

## Project Structure

```
bashkeveprimi-backend/
├── manage.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── README.md
├── bashkeveprimi/              # Project configuration
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── __init__.py
│   ├── causes/                 # Causes/Campaigns app
│   ├── donations/              # Donation management
│   ├── projects/               # Projects app
│   ├── users/                  # User management
│   ├── contact/                # Contact messages
│   ├── organization/           # Organization info
│   ├── volunteers/             # Volunteer management
│   ├── requests/               # Help requests
│   └── core/                   # Shared utilities
├── media/                      # User-uploaded files
├── static/                     # Static files
└── tests/                      # Test suite
```

## Step 1: Initial Setup

### 1.1 Create Project Directory
```bash
mkdir bashkeveprimi-backend
cd bashkeveprimi-backend
```

### 1.2 Create Virtual Environment
```bash
# Using venv
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Or using virtualenv
virtualenv venv
source venv/bin/activate
```

### 1.3 Install Django and Initial Packages
```bash
pip install django djangorestframework django-cors-headers psycopg2-binary python-decouple pillow
```

### 1.4 Create Django Project
```bash
django-admin startproject bashkeveprimi .
```

## Step 2: Install Required Packages

### 2.1 Create requirements.txt
```txt
# Core
Django==5.0.0
djangorestframework==3.14.0
django-cors-headers==4.3.1

# Database
psycopg2-binary==2.9.9

# Authentication & Security
djangorestframework-simplejwt==5.3.1
django-allauth==0.58.2

# File handling
Pillow==10.2.0
django-storages==1.14.2
boto3==1.34.10

# Utilities
python-decouple==3.8
python-slugify==8.0.1

# Task Queue
celery==5.3.4
redis==5.0.1
django-celery-beat==2.5.0

# API Documentation
drf-spectacular==0.27.0

# Development
django-debug-toolbar==4.2.0
ipython==8.19.0

# Testing
pytest==7.4.3
pytest-django==4.7.0
factory-boy==3.3.0

# Production
gunicorn==21.2.0
whitenoise==6.6.0
sentry-sdk==1.39.1

# Rate limiting
django-ratelimit==4.1.0

# Image optimization
django-imagekit==5.0.0
```

### 2.2 Install All Packages
```bash
pip install -r requirements.txt
```

## Step 3: Database Setup

### 3.1 Create PostgreSQL Database
```bash
# Login to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE bashkeveprimi;
CREATE USER bashkeveprimi_user WITH PASSWORD 'your_secure_password';
ALTER ROLE bashkeveprimi_user SET client_encoding TO 'utf8';
ALTER ROLE bashkeveprimi_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE bashkeveprimi_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE bashkeveprimi TO bashkeveprimi_user;
\q
```

### 3.2 Configure Environment Variables
Create `.env` file in project root:

```env
# Django
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_ENGINE=django.db.backends.postgresql
DATABASE_NAME=bashkeveprimi
DATABASE_USER=bashkeveprimi_user
DATABASE_PASSWORD=your_secure_password
DATABASE_HOST=localhost
DATABASE_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5174,http://localhost:5175,http://localhost:3000

# Email (Development - Console)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# File Upload
MAX_UPLOAD_SIZE=10485760

# API
API_VERSION=v1
```

## Step 4: Configure Django Settings

### 4.1 Update settings.py
```python
import os
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    'imagekit',
    'django_celery_beat',
    
    # Local apps
    'apps.core',
    'apps.users',
    'apps.causes',
    'apps.donations',
    'apps.projects',
    'apps.contact',
    'apps.organization',
    'apps.volunteers',
    'apps.requests',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'bashkeveprimi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database
DATABASES = {
    'default': {
        'ENGINE': config('DATABASE_ENGINE'),
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USER'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': config('DATABASE_HOST'),
        'PORT': config('DATABASE_PORT', default='5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Belgrade'  # Kosovo timezone
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Settings
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='http://localhost:5174').split(',')
CORS_ALLOW_CREDENTIALS = True

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
}

# JWT Settings
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# Celery Configuration
CELERY_BROKER_URL = config('CELERY_BROKER_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = config('CELERY_RESULT_BACKEND', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE

# File Upload Settings
MAX_UPLOAD_SIZE = config('MAX_UPLOAD_SIZE', default=10485760, cast=int)  # 10MB
```

## Step 5: Create Django Apps

```bash
# Create apps directory
mkdir apps
touch apps/__init__.py

# Create individual apps
python manage.py startapp core apps/core
python manage.py startapp users apps/users
python manage.py startapp causes apps/causes
python manage.py startapp donations apps/donations
python manage.py startapp projects apps/projects
python manage.py startapp contact apps/contact
python manage.py startapp organization apps/organization
python manage.py startapp volunteers apps/volunteers
python manage.py startapp requests apps/requests
```

## Step 6: Create Models

### Example: Cause Model (apps/causes/models.py)
```python
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.ImageField(upload_to='categories/', null=True, blank=True)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Location(models.Model):
    city = models.CharField(max_length=100)
    region = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, default="Kosovo")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['city']
    
    def __str__(self):
        return f"{self.city}, {self.country}"


class Cause(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    slogan = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    short_description = models.TextField(max_length=500)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='causes')
    demanded_amount = models.DecimalField(max_digits=10, decimal_places=2)
    collected_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    featured_image = models.ImageField(upload_to='causes/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    featured = models.BooleanField(default=False)
    priority = models.IntegerField(default=0, help_text="Higher priority shows first in slider")
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='causes')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    view_count = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-priority', '-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    @property
    def progress_percentage(self):
        if self.demanded_amount > 0:
            return (self.collected_amount / self.demanded_amount) * 100
        return 0
    
    @property
    def is_completed(self):
        return self.collected_amount >= self.demanded_amount
```

## Step 7: Create Serializers

### Example: Cause Serializer (apps/causes/serializers.py)
```python
from rest_framework import serializers
from .models import Cause, Category, Location


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'city', 'region', 'country']


class CauseListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Cause
        fields = [
            'id', 'title', 'slug', 'slogan', 'short_description',
            'category', 'demanded_amount', 'collected_amount',
            'progress_percentage', 'featured_image', 'status',
            'featured', 'location', 'created_at'
        ]


class CauseDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    is_completed = serializers.ReadOnlyField()
    
    class Meta:
        model = Cause
        fields = '__all__'
```

## Step 8: Create Views

### Example: Cause Views (apps/causes/views.py)
```python
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cause, Category
from .serializers import CauseListSerializer, CauseDetailSerializer, CategorySerializer


class CauseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cause.objects.filter(status='active')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'location', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'priority', 'demanded_amount']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CauseDetailSerializer
        return CauseListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured causes for homepage slider"""
        causes = self.queryset.filter(featured=True).order_by('-priority')[:3]
        serializer = self.get_serializer(causes, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
```

## Step 9: Configure URLs

### Main URLs (bashkeveprimi/urls.py)
```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # API endpoints
    path('api/v1/', include('apps.causes.urls')),
    path('api/v1/', include('apps.donations.urls')),
    path('api/v1/', include('apps.projects.urls')),
    path('api/v1/', include('apps.contact.urls')),
    path('api/v1/', include('apps.organization.urls')),
    path('api/v1/', include('apps.users.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

### App URLs (apps/causes/urls.py)
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CauseViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'causes', CauseViewSet, basename='cause')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
]
```

## Step 10: Run Migrations

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

## Step 11: Load Initial Data

Create fixtures or management commands for initial data:

```bash
# Create management command directory
mkdir -p apps/core/management/commands

# Create seed data command
touch apps/core/management/commands/seed_data.py
```

Example seed_data.py:
```python
from django.core.management.base import BaseCommand
from apps.causes.models import Category, Location

class Command(BaseCommand):
    help = 'Seed initial data'
    
    def handle(self, *args, **kwargs):
        # Create categories
        categories = [
            {'name': 'Orphan Support', 'description': 'Supporting orphans with care and education'},
            {'name': 'Education', 'description': 'Educational programs and school supplies'},
            {'name': 'Food Distribution', 'description': 'Food packages for families in need'},
            # Add more...
        ]
        
        for cat_data in categories:
            Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
        
        # Create locations
        locations = [
            {'city': 'Ferizaj', 'region': 'Ferizaj'},
            {'city': 'Gjilan', 'region': 'Gjilan'},
            {'city': 'Prishtina', 'region': 'Prishtina'},
            # Add more...
        ]
        
        for loc_data in locations:
            Location.objects.get_or_create(
                city=loc_data['city'],
                defaults=loc_data
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))
```

Run the command:
```bash
python manage.py seed_data
```

## Step 12: Run Development Server

```bash
# Start Django development server
python manage.py runserver 8000

# In another terminal, start Celery (if needed)
celery -A bashkeveprimi worker -l info

# Start Celery Beat (for scheduled tasks)
celery -A bashkeveprimi beat -l info
```

## Step 13: Test API Endpoints

```bash
# Using curl
curl http://localhost:8000/api/v1/causes/

# Or visit in browser
http://localhost:8000/api/docs/  # Swagger UI
```

## Testing

### Run Tests
```bash
# Run all tests
python manage.py test

# Run tests with coverage
pytest --cov=apps

# Run specific app tests
python manage.py test apps.causes
```

## Production Deployment

### Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### Run with Gunicorn
```bash
gunicorn bashkeveprimi.wsgi:application --bind 0.0.0.0:8000
```

### Nginx Configuration (example)
```nginx
server {
    listen 80;
    server_name api.bashkeveprimi.org;
    
    location /static/ {
        alias /path/to/staticfiles/;
    }
    
    location /media/ {
        alias /path/to/media/;
    }
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Useful Commands

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Shell
python manage.py shell

# Database shell
python manage.py dbshell

# Check for issues
python manage.py check

# Clear sessions
python manage.py clearsessions
```

## Next Steps

1. Implement payment gateway integration
2. Set up email templates
3. Configure AWS S3 for production file storage
4. Implement comprehensive test suite
5. Set up CI/CD pipeline
6. Configure monitoring and logging
7. Implement rate limiting
8. Add caching layer
9. Create admin customizations
10. Write API documentation

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Celery Documentation](https://docs.celeryproject.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

*For detailed project requirements, see PROJECT_DOCUMENTATION.md*

