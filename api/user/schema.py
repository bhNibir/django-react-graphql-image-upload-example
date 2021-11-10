
import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload

from .models import UserProfile

class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = ("id", "name", "avatar")

    avatar_url = graphene.String()

    def resolve_avatar_url(self, info):        
        return info.context.build_absolute_uri(self.avatar.url)
class Query(graphene.ObjectType):
    all_users = graphene.List(UserProfileType)

   
    def resolve_all_users(root, info):
        return UserProfile.objects.all()


class CreateUserProfile(graphene.Mutation):
    user_profile = graphene.Field(UserProfileType)

    class Arguments:
        name = graphene.String(required=True)
        avatar = Upload(required=True)

    

    def mutate(self, info, name, avatar):
        print(name)
        print(avatar.size)
        #we can code here for uploading any static server.
        user_profile = UserProfile(name=name, avatar= avatar)
        user_profile.save()

        return CreateUserProfile(user_profile=user_profile)


class Mutation(graphene.ObjectType):
    create_user_profile = CreateUserProfile.Field()
 
