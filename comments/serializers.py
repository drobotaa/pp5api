from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    posted_at = serializers.SerializerMethodField()
    edited_at = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_posted_at(self, obj):
        return naturaltime(obj.posted_at)
    
    def get_edited_at(self, obj):
        return naturaltime(obj.edited_at)
    
    class Meta:
        model = Comment
        fields = [
            'id' ,'owner', 'is_owner', 'post', 'posted_at',
            'edited_at', 'body', 'profile_id',
            'profile_image'
        ]


class CommetDetailSerializer(CommentSerializer):
    post = serializers.ReadOnlyField(source='post.id')
