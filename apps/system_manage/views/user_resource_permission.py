# coding=utf-8
"""
    @project: MaxKB
    @Author：虎虎
    @file： workspace_user_resource_permission.py
    @date：2025/4/28 16:38
    @desc:
"""
from django.db.models import QuerySet
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework.request import Request
from rest_framework.views import APIView

from common import result
from common.auth import TokenAuth
from common.auth.authentication import has_permissions
from common.constants.permission_constants import PermissionConstants, RoleConstants, Permission, Group, Operate
from common.log.log import log
from common.result import DefaultResultSerializer
from system_manage.api.user_resource_permission import UserResourcePermissionAPI, EditUserResourcePermissionAPI
from system_manage.serializers.user_resource_permission import UserResourcePermissionSerializer
from users.models import User


def get_user_operation_object(user_id):
    user_model = QuerySet(model=User).filter(id=user_id).first()
    if user_model is not None:
        return {
            "name": user_model.username
        }
    return {}


class WorkSpaceUserResourcePermissionView(APIView):
    authentication_classes = [TokenAuth]

    @extend_schema(
        methods=['GET'],
        description=_('Obtain resource authorization list'),
        operation_id=_('Obtain resource authorization list'),  # type: ignore
        parameters=UserResourcePermissionAPI.get_parameters(),
        responses=UserResourcePermissionAPI.get_response(),
        tags=[_('Resources authorization')]  # type: ignore
    )
    @has_permissions(
        lambda r, kwargs: Permission(group=Group(kwargs.get('resource') + '_WORKSPACE_USER_RESOURCE_PERMISSION'),
                                     operate=Operate.READ),
        RoleConstants.ADMIN, RoleConstants.WORKSPACE_MANAGE.get_workspace_role())
    def get(self, request: Request, workspace_id: str, user_id: str, resource: str):
        return result.success(UserResourcePermissionSerializer(
            data={'workspace_id': workspace_id, 'user_id': user_id, 'auth_target_type': resource}
        ).list(request.user))

    @extend_schema(
        methods=['PUT'],
        description=_('Modify the resource authorization list'),
        operation_id=_('Modify the resource authorization list'),  # type: ignore
        parameters=UserResourcePermissionAPI.get_parameters(),
        request=EditUserResourcePermissionAPI.get_request(),
        responses=DefaultResultSerializer(),
        tags=[_('Resources authorization')]  # type: ignore
    )
    @log(menu='System', operate='Modify the resource authorization list',
         get_operation_object=lambda r, k: get_user_operation_object(k.get('user_id'))
         )
    @has_permissions(
        lambda r, kwargs: Permission(group=Group(kwargs.get('resource') + '_WORKSPACE_USER_RESOURCE_PERMISSION'),
                                     operate=Operate.EDIT),
        RoleConstants.ADMIN, RoleConstants.WORKSPACE_MANAGE.get_workspace_role())
    def put(self, request: Request, workspace_id: str, user_id: str, resource: str):
        return result.success(UserResourcePermissionSerializer(
            data={'workspace_id': workspace_id, 'user_id': user_id, 'auth_target_type': resource}
        ).edit(request.data, request.user))
