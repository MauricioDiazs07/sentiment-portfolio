from flask import request, jsonify
from api.responses.json_response import JsonResponse
from http import HTTPStatus
from api.handlers.json_response_handler import json_response_handler

class TextController:
    def __init__(self, bert_model, translate):
        self.bert_model = bert_model
        self.translate = translate

    @json_response_handler
    def get_text_response(self):
        text = request.json.get('text', None)
        lang = request.json.get('lang', None)

        original_text = text

        if (lang == 'es'):
            text = self.translate.traducir(text)

        response = self.bert_model.predic(text)

        isPos = response[0] == 'Positive'

        return JsonResponse(HTTPStatus.OK, {
            'text': original_text,
            'isPos': isPos
        })