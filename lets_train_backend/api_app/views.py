# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# Libraries
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
# User defined 
from models import (Training, Content, 
	Enrollment, UserHistory)
from serializers import (UserSerializer, TrainingSerializer, 
	TrainingContentSerializer, ContentSerializer, EnrollmentSerializer, 
	UserHistorySerializer)

class UserList(generics.ListCreateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	queryset = User.objects.all()
	serializer_class = UserSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('id', 'username',)

class ContentList(generics.ListCreateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	parser_classes = (MultiPartParser,)
	queryset = Content.objects.all()
	serializer_class = ContentSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('title',)

class TrainingList(generics.ListCreateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	serializer_class = TrainingSerializer
	queryset = Training.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('name', 'category',)

class TrainingContentList(generics.ListCreateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)	
	serializer_class = TrainingContentSerializer
	queryset = Training.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('name', 'category',)

class EnrollmentList(generics.ListCreateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)	
	queryset = Enrollment.objects.all()
	serializer_class = EnrollmentSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('user_id', 'training_id',)

class UserHistoryList(generics.ListCreateAPIView):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)	
	queryset = UserHistory.objects.all()
	serializer_class = UserHistorySerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('user_id', 'content_id',)