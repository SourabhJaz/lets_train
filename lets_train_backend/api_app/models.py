from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField

class Department(models.Model):
	department_name = models.CharField(max_length = 30, unique = True, 
		null = True, default = None)

class Category(models.Model):
	category_name = models.CharField(max_length = 30, unique = True, 
		null = True, default = None)

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	department = models.ForeignKey(Department, on_delete=models.CASCADE, 
		null = True)
	employee_code = models.IntegerField(unique = True, default = 0)
	business_unit = models.CharField(max_length = 50,
		blank=True, null = True, default = None)
	unit = models.CharField(max_length = 50,
		blank=True, null = True, default = None)
	function = models.CharField(max_length = 50,
		blank=True, null = True, default = None)
	location = models.CharField(max_length = 50,
		blank=True, null = True, default = None)
	manager_code = models.IntegerField(blank=True, null=True, default = 0)
	manager_name = models.CharField(max_length = 50, 
		blank=True, null = True, default = None)

class Training(models.Model):
	name = models.CharField(max_length = 50, unique = True)
	category = models.ForeignKey(Category, on_delete=models.CASCADE, 
		null = True)
	department = models.ForeignKey(Department, on_delete=models.CASCADE, 
		null = True)
	details = JSONField(default = {}, null = True)

class Content(models.Model):
	title = models.CharField(max_length = 30)
	path = models.FileField()
	training = models.ManyToManyField('Training', 
		related_name='training_content')
	attributes = JSONField(default = {}, null = True)

class Assignment(models.Model):
	user = models.ForeignKey(User, 
		on_delete=models.CASCADE, null = True)
	training = models.ForeignKey('Training', 
		on_delete=models.CASCADE, null = True)
	class Meta:
		unique_together = ('user', 'training', )

class UserHistory(models.Model):
	user = models.ForeignKey(User, 
		on_delete=models.CASCADE, null = True)
	content = models.ForeignKey('Content', 
		on_delete=models.CASCADE, null = True)
	class Meta:
		unique_together = ('user', 'content', )