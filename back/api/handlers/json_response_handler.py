from typing import Callable, Tuple
from flask import jsonify

from flask.wrappers import Response

from api.responses.http_response import HTTPResponse


def json_response_handler(f: Callable[..., HTTPResponse]):
    def to_json_status_code(*args) -> Tuple[Response, int]:
        response = f(*args)
        return jsonify(response.to_dict_response()), response.status_code

    return to_json_status_code
