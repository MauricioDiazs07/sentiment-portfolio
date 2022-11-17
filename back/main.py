from core.video.main_video import bucle_video
from core.imagen.main_imagen import emotion_img
from cv2 import CascadeClassifier
import tensorflow as tf
import mediapipe as mp


#Load principal datas
faceClassif = CascadeClassifier('./back/data/video/haarcascade_frontalface_default.xml')
model = tf.keras.models.load_model('./back/data/video/0.606854_1.107095.hdf5')
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.3)


#Correr video
camara_numero = 0
video_class = bucle_video(camara_numero,faceClassif,model, mp_hands)
video_class.star_video()


#Correr imagen
from cv2 import imread
img = imread('./back/data/img/sor.jpg')
emotion_img(img,faceClassif,model)

