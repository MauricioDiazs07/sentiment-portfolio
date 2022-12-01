from flask import jsonify, request, send_file
from core.imagen.main_imagen import emotion_img
from cv2 import imread, imwrite

img_path = './back/resources/img/img.png'
img_response_path = './resources/img/img.png'
class ImageController:
    def __init__(self, face_model, model):
        self.face_model = face_model
        self.model = model

    def get_image_analysis(self):
        # txt = request.json.get('img', None)
        img_file = request.files.get('img', '')

        img_file.save(img_path)
        img = imread(img_path)
        img_result = emotion_img(img, self.face_model, self.model)

        img = img_result.get_img()
        
        imwrite(img_path, img)

        # f = open(img_path, 'r')

        # return send_file(f, mimetype='image/png')
        return send_file(img_response_path)