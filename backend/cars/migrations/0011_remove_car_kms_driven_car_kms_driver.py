# Generated by Django 5.1 on 2024-09-02 15:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("cars", "0010_auto_20240902_2057"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="car",
            name="kms_driven",
        ),
        migrations.AddField(
            model_name="car",
            name="kms_driver",
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
