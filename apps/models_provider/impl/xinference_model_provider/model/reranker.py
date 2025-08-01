# coding=utf-8
"""
    @project: MaxKB
    @Author：虎
    @file： reranker.py
    @date：2024/9/10 9:45
    @desc:
"""
from typing import Sequence, Optional, Any, Dict

from langchain_core.callbacks import Callbacks
from langchain_core.documents import BaseDocumentCompressor, Document
from xinference_client.client.restful.restful_client import RESTfulRerankModelHandle

from models_provider.base_model_provider import MaxKBBaseModel


class XInferenceReranker(MaxKBBaseModel, BaseDocumentCompressor):
    server_url: Optional[str]
    """URL of the xinference server"""
    model_uid: Optional[str]
    """UID of the launched model"""
    api_key: Optional[str]

    @staticmethod
    def new_instance(model_type, model_name, model_credential: Dict[str, object], **model_kwargs):
        return XInferenceReranker(server_url=model_credential.get('server_url'), model_uid=model_name,
                                  api_key=model_credential.get('api_key'), top_n=model_kwargs.get('top_n', 3))

    top_n: Optional[int] = 3

    def compress_documents(self, documents: Sequence[Document], query: str, callbacks: Optional[Callbacks] = None) -> \
            Sequence[Document]:
        if documents is None or len(documents) == 0:
            return []
        client: Any
        if documents is None or len(documents) == 0:
            return []
        try:
            from xinference.client import RESTfulClient
        except ImportError:
            try:
                from xinference_client import RESTfulClient
            except ImportError as e:
                raise ImportError(
                    "Could not import RESTfulClient from xinference. Please install it"
                    " with `pip install xinference` or `pip install xinference_client`."
                ) from e

        client = RESTfulClient(self.server_url, self.api_key)
        model: RESTfulRerankModelHandle = client.get_model(self.model_uid)
        res = model.rerank([document.page_content for document in documents], query, self.top_n, return_documents=True)
        return [Document(page_content=d.get('document', {}).get('text'),
                         metadata={'relevance_score': d.get('relevance_score')}) for d in res.get('results', [])]
