from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def validate_image(self, value):
        if value.size > 1024 * 1024 * 4:
            raise serializers.ValidationError(
                'The image is bigger than 4MB'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'The image is wider than 4096px'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'The image is higher than 4096px'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'is_owner', 'created_at',
            'updated_at', 'title', 'description',
            'image', 'profile_id', 'profile_image',
            'image_filter', 'category_filter'
        ]
