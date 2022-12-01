from typing import Any, Dict, List

from api.responses.http_response import HTTPResponse


class JsonResponse(HTTPResponse):
    def __init__(self,
                 status_code: int,
                 dict: Dict[str, Any]
                 ) -> None:
        self.status_code = status_code
        self.dict = dict

    def to_dict_response(self) -> Dict[str, Any]:
        return self.dict