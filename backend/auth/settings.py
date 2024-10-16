
import os
from pathlib import Path
import environ
from datetime import timedelta

env = environ.Env(DEBUG=(bool, False))
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(BASE_DIR / '.env')

SECRET_KEY = env("SECRET_KEY")

DEBUG = env("DEBUG")

ALLOWED_HOSTS = []

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:3000",
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # External Apps
    'rest_framework',
    'corsheaders',
    'djoser',
    'rest_framework_simplejwt',
    # Internal Apps
    'users',
    'cars',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = "auth.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "auth.wsgi.application"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'DriveHex',
        'USER': 'postgres',
        'PASSWORD': 'Hitsy@0408',
        'HOST': 'localhost',
        'PORT': '5433',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = 'users.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': (
        'Bearer',
        'JWT'),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=60),
    'SIGNING_KEY': env('SIGNING_KEY'),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'USERNAME_RESET_CONFIRM_URL': 'username/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user_create': 'users.serializers.CreateUserSerializer',
        'user': 'users.serializers.CreateUserSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',      
    },
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'drivehex0422@gmail.com' 
EMAIL_HOST_PASSWORD = 'snqzrkzoaoutgjac' 
DEFAULT_FROM_EMAIL = 'drivehex0422@gmail.com'
DOMAIN = env("DOMAIN") 
SITE_NAME = 'DriveHex'

MEDIA_ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'..','frontend','public')
MEDIA_URL = '/'