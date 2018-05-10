from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField


class Training(models.Model):
	name = models.CharField(max_length = 50, unique = True)
	category = models.CharField(max_length = 30)
	details = JSONField(default = {}, null = True)

class Content(models.Model):
	title = models.CharField(max_length = 30)
	path = models.FileField()
	training_id = models.ManyToManyField('Training', 
		related_name='training_content')
	attributes = JSONField(default = {}, null = True)

class Enrollment(models.Model):
	user_id = models.ForeignKey(User, 
		on_delete=models.CASCADE, null = True)
	training_id = models.ForeignKey('Training', 
		on_delete=models.CASCADE, null = True)
	class Meta:
		unique_together = ('user_id', 'training_id', )

class UserHistory(models.Model):
	user_id = models.ForeignKey(User, 
		on_delete=models.CASCADE, null = True)
	content_id = models.ForeignKey('Content', 
		on_delete=models.CASCADE, null = True)
	class Meta:
		unique_together = ('user_id', 'content_id', )