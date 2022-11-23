from flask import jsonify, request
from core.imagen.main_imagen import emotion_img
from cv2 import imread

class ImageController:
    def __init__(self, face_model, model):
        self.face_model = face_model
        self.model = model

    def get_image_analysis(self):
        txt = request.json.get('img', None)
        # img = imread()
        # img = emotion_img(img, self.face_model, self.model)

        return jsonify({
            'img': txt
        })
