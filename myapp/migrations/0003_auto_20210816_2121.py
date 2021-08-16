# Generated by Django 3.2.6 on 2021-08-16 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20210816_0019'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='lastseasonttl',
        ),
        migrations.RemoveField(
            model_name='player',
            name='status',
        ),
        migrations.AddField(
            model_name='player',
            name='average',
            field=models.FloatField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='games',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='points',
            field=models.FloatField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='price',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='player',
            name='season',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='player',
            name='team',
            field=models.CharField(max_length=100, verbose_name='Team'),
        ),
    ]
