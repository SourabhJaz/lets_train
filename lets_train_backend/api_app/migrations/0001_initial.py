# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-08 18:36
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('path', models.URLField()),
                ('attributes', django.contrib.postgres.fields.jsonb.JSONField(default={}, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('category', models.CharField(max_length=30)),
                ('details', django.contrib.postgres.fields.jsonb.JSONField(default={}, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_validated', models.BooleanField(default=False)),
                ('personal_details', django.contrib.postgres.fields.jsonb.JSONField(default={}, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api_app.Content')),
                ('employee_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api_app.User')),
            ],
        ),
        migrations.AddField(
            model_name='enrollment',
            name='employee_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api_app.User'),
        ),
        migrations.AddField(
            model_name='enrollment',
            name='training_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api_app.Training'),
        ),
        migrations.AddField(
            model_name='content',
            name='training_id',
            field=models.ManyToManyField(related_name='training_content', to='api_app.Training'),
        ),
        migrations.AlterUniqueTogether(
            name='userhistory',
            unique_together=set([('employee_id', 'content_id')]),
        ),
        migrations.AlterUniqueTogether(
            name='enrollment',
            unique_together=set([('employee_id', 'training_id')]),
        ),
    ]
