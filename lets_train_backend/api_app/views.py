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
	def get_serializer(self, *args, **kwargs):
		if "data" in kwargs:
			data = kwargs["data"]

		# check if many is required
			if isinstance(data, list):
				kwargs["many"] = True

		return super(UserViewSet, self).get_serializer(*args, **kwargs)
	# filter_backends = (DjangoFilterBackend,)
	# filter_fields = ('username',)

class CategoryViewSet(viewsets.ModelViewSet):
	pagination_class = None
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	queryset = Category.objects.all()
	serializer_class = CategorySerializer

class DepartmentViewSet(viewsets.ModelViewSet):
	pagination_class = None
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	queryset = Department.objects.all()
	serializer_class = DepartmentSerializer
		
class ContentViewSet(viewsets.ModelViewSet):
	pagination_class = None
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	parser_classes = (MultiPartParser,)
	queryset = Content.objects.all()
	serializer_class = ContentSerializer
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('title',)

class TrainingViewSet(viewsets.ModelViewSet):
	pagination_class = None
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	serializer_class = TrainingSerializer
	queryset = Training.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('name', 'category_id','department_id')

class TrainingContentViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	serializer_class = TrainingContentSerializer
	queryset = Training.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('name', 'category_id','department_id')

class AssignmentViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly,)	
	queryset = Assignment.objects.all()
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

