# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# Libraries
from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser
# User defined 
from models import *
from serializers import *
from permissions import IsAdminOrReadOnly

# List-create-query API view (Multiple instances)
class UserViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	queryset = User.objects.all()
	serializer_class = UserSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('username','email')

class ContentViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	parser_classes = (MultiPartParser,)
	queryset = Content.objects.all()
	serializer_class = ContentSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('title',)

class TrainingViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	serializer_class = TrainingSerializer
	queryset = Training.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('name', 'category','department')

class TrainingContentViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	serializer_class = TrainingContentSerializer
	queryset = Training.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('name', 'category','department')

class AssignmentViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly,)	
	queryset = Enrollment.objects.all()
	serializer_class = AssignmentSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('user_id', 'training_id',)

class UserHistoryViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminUser,)	
	queryset = UserHistory.objects.all()
	serializer_class = UserHistorySerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('user_id', 'content_id',)

class EnrollmentViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)	
	queryset = Enrollment.objects.all()
	serializer_class = EnrollmentSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('user_id', 'training_id',)
