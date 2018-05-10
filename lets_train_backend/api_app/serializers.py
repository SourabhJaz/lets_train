from rest_framework import serializers
from models import (Training, Content, 
Enrollment, UserHistory)
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'email',)
		write_only_fields = ('password',)
		read_only_fields = ('id',)

	def validate(self, data):
		return data

	def create(self, validated_data):
		user = User.objects.create(
			username=validated_data['username'],
		)
		user.set_password(validated_data['password'])
		user.save()

		return user

class ContentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Content
		fields = '__all__'

	def validate(self, data):
		return data 

class TrainingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Training
		fields = '__all__'

	def validate(self, data):
		return data 

class TrainingContentSerializer(serializers.ModelSerializer):
	training_content = ContentSerializer(many = True, read_only = True)
	class Meta:
		model = Training
		fields = ('name', 'category', 'details', 'training_content')

	def validate(self, data):
		return data 

class EnrollmentSerializer(serializers.ModelSerializer):
	user = UserSerializer(source = 'user_id', read_only = True)
	training = TrainingSerializer(source = 'training_id', read_only = True)
	class Meta:
		model = Enrollment
		fields = ('user_id', 'training_id', 
			'user', 'training')

	def validate(self, data):
		return data 

class UserHistorySerializer(serializers.ModelSerializer):
	user = UserSerializer(source = 'user_id', read_only = True)
	content = ContentSerializer(source = 'content_id', read_only = True)
	class Meta:
		model = UserHistory
		fields = ('user_id', 'content_id', 
		'user', 'content')

	def validate(self, data):
		return data 
