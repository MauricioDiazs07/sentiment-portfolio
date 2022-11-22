from flask import jsonify, request

class TextController:
    def __init__(self, bert_model, translate):
        self.bert_model = bert_model
        self.translate = translate

    def get_text_response(self):
        text = request.json.get('text', None)
        lang = request.json.get('lang', None)

        original_text = text

        if (lang == 'es'):
            text = self.translate.traducir(text)

        response = self.bert_model.predic(text)

        isPos = response == 'pos'

        print("Respuesta")
        print(response)

        return jsonify({
            'text': original_text,
            'isPos': isPos
        })