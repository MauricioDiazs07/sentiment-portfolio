from flask import Flask
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, jwt_required
from core.texto.texto_bert import bert
from core.traductor.traductor import traductor_es_en
from api.controllers.text_controller import TextController
import os

### models
bert = bert()
translate = traductor_es_en()

### controllers
textController = TextController(bert, translate)


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config["JWT_SECRET_KEY"] = "super-secret-1232342"

jwt = JWTManager(app)
cors = CORS(app)

@app.get('/')
def main():
    return "sentiment project"

@app.post('/get-text-sentiment')
def get_text_sentiment():
    return textController.get_text_response()

if __name__ == '__main__':
    HOST = os.environ.get("HOST", '0.0.0.0')
    port = int(os.environ.get("PORT", 5000))
    app.run(host=HOST, port=port, debug=True)