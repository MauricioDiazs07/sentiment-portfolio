from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, jwt_required
from core.texto.texto_bert import bert, load_bert
from core.traductor.traductor import traductor_es_en
from api.controllers.text_controller import TextController
from api.controllers.image_controller import ImageController
from cv2 import CascadeClassifier
import tensorflow as tf
import os

### models
model_bert = load_bert()
bert = bert(model_bert)
translate = traductor_es_en()

faceClassif = CascadeClassifier('./back/resources/models/haarcascade_frontalface_default.xml')
model = tf.keras.models.load_model('./back/resources/models/0.606854_1.107095.hdf5')

### controllers
textController = TextController(bert, translate)
imgController = ImageController(faceClassif, model)


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config["JWT_SECRET_KEY"] = "super-secret-1232342"

jwt = JWTManager(app)
cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.get('/')
def main():
    return "sentiment project"

@app.route('/api/sentiment/get-text-sentiment', methods=['POST', 'OPTIONS'])
@cross_origin()
def get_text_sentiment():
    return textController.get_text_response()
    
@app.post('/api/sentiment/get-img-sentiment')
@cross_origin()
def get_img_sentiment():
    return imgController.get_image_analysis()

@app.after_request
def after_request(response):
    if not response.headers['Access-Control-Allow-Origin']:
        response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    port = os.getenv("PORT", default=5000)
    app.run(port=port, debug=True)