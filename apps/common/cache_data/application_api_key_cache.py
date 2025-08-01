# coding=utf-8
"""
    @project: MaxKB
    @Author：虎
    @file： application_api_key_cache.py
    @date：2024/7/25 11:30
    @desc:
"""
from django.core.cache import cache
from django.db.models import QuerySet

from application.models import ApplicationApiKey
from common.constants.cache_version import Cache_Version
from common.utils.cache_util import get_cache


@get_cache(cache_key=Cache_Version.APPLICATION_API_KEY.get_key_func(),
           use_get_data=lambda secret_key, use_get_data: use_get_data,
           version=Cache_Version.APPLICATION_API_KEY.get_version())
def get_application_api_key(secret_key, use_get_data):
    application_api_key = QuerySet(ApplicationApiKey).filter(secret_key=secret_key[7:]).first()
    return {'allow_cross_domain': application_api_key.allow_cross_domain,
            'cross_domain_list': application_api_key.cross_domain_list}


def del_application_api_key(secret_key):
    cache.delete(Cache_Version.APPLICATION_API_KEY.get_key(secret_key=secret_key, use_get_data=True),
                 version=Cache_Version.APPLICATION_API_KEY.get_version())
