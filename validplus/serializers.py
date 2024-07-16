from django.db import IntegrityError
from rest_framework import serializers
from .models import ValidPlus


class ValidPlusSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = ValidPlus
        fields = [
            'id', 'owner', 'post', 'validated_at'
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail' : 'Duplicate!'
            })
