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
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection
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

	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('username',)

	@action(detail=True, methods=['get'])
	def department_training(self, request, pk=None):
		user_id = pk
		with connection.cursor() as cursor:
			cursor.execute('''Select api_app_userprofile.department_id 
				from api_app_userprofile 
				where api_app_userprofile.employee_code = %s''', [user_id])
			department_id = cursor.fetchone()
		queryset = Training.objects.raw('''Select * 
			from api_app_training 
			where api_app_training.department_id = %s''', [department_id])
		serializer = TrainingSerializer(queryset, many=True)
		return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
	pagination_class = None
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAdminOrReadOnly, )
	queryset = Category.objects.all()
	serializer_class = CategorySerializer

	@action(detail=True, methods=['get'])
	def category_training(self, request, pk=None):
		category_id = pk
		queryset = Training.objects.raw('''Select * 
			from api_app_training 
			where api_app_training.category_id = %s
			or api_app_training.department_id is NULL''', [category_id])
		print(queryset)
		serializer = TrainingSerializer(queryset, many=True)
		return Response(serializer.data)

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
