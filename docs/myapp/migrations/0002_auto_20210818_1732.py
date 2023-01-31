# Generated by Django 3.2.6 on 2021-08-18 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='y1_average',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='y1_points',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='y2_average',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='y2_points',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='y3_average',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='y3_points',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
