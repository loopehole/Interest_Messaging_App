# Generated by Django 4.2.13 on 2024-07-10 06:37

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0002_interest_accepted_interest_recipient_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='interest',
            old_name='recipient',
            new_name='receiver',
        ),
        migrations.AlterUniqueTogether(
            name='interest',
            unique_together={('sender', 'receiver')},
        ),
    ]
