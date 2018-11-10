from rest_framework import serializers
from models import *
from django.contrib.auth.models import User
from utilities import get_registration_message

class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('employee_code', 'business_unit', 
			'unit','function', 'location', 
			'manager_code', 'manager_name', 'department')

	def validate(self, data):
		return data

class UserSerializer(serializers.ModelSerializer):
	userprofile = UserProfileSerializer(required = False)

	class Meta:
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'email', 
			'password', 'is_staff', 'userprofile')
		write_only = ('password',)
		read_only = ('id',)

	def validate(self, data):
		return data

	def create(self, validated_data, instance=None):
		profile_data = validated_data.pop('userprofile')
		user = User.objects.create(**validated_data)
		user.set_password(validated_data['password'])
		user.save()
		UserProfile.objects.update_or_create(user = user, 
			**profile_data)
		message = get_registration_message(validated_data)
		user.email_user('Welcome to the future!', message)
		return user

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = '__all__'

	def validate(self, data):
		category_name = data['category_name']
		data['category_name'] = category_name.lower()
		return data

class DepartmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Department
		fields = '__all__'

	def validate(self, data):
		department_name = data['department_name']
		data['department_name'] = department_name.lower()
		return data 

class TrainingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Training
		fields = '__all__'

	def validate(self, data):
		return data 

# To serialise many-to-many fields with multipart data (videos)
class MultipartM2MField(serializers.Field):
    def to_representation(self, obj):
        return obj.values_list('id', flat=True).order_by('id')

    def to_internal_value(self, data):
        return data.split(',') if data else None

class ContentSerializer(serializers.ModelSerializer):
	training = MultipartM2MField()
	class Meta:
		model = Content
		fields = '__all__'

	def validate(self, data):
		return data 


class TrainingContentSerializer(serializers.ModelSerializer):
	training_content = ContentSerializer(many = True, read_only = True)
	category = CategorySerializer(read_only = True)
	department = DepartmentSerializer(read_only = True)
	class Meta:
		model = Training
		fields = ('name', 'category', 'department', 'details', 'training_content')

	def validate(self, data):
		return data 

class AssignmentSerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only = True)
	training = TrainingSerializer(read_only = True)
	class Meta:
		model = Assignment
		fields = ('user', 'training')

	def validate(self, data):
		return data 

class UserHistorySerializer(serializers.ModelSerializer):
	user = UserSerializer(read_only = True)
	content = ContentSerializer(read_only = True)
	class Meta:
		model = UserHistory
		fields = ('user', 'content')

	def validate(self, data):
		return data 
