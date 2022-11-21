from core.video.main_video import bucle_video
from core.imagen.main_imagen import emotion_img
from core.traductor.traductor import traductor_es_en
from core.marc_habla.voz import voz
from cv2 import CascadeClassifier
#import tensorflow as tf


#Load principal datas
#faceClassif = CascadeClassifier('./back/data/video/haarcascade_frontalface_default.xml')
#model = tf.keras.models.load_model('./back/data/video/0.606854_1.107095.hdf5')


#Correr video
#camara_numero = 0
#video_class = bucle_video(camara_numero,faceClassif,model)
#video_class.star_video()


#Correr imagen
#from cv2 import imread
#img = imread('./back/data/img/sor.jpg')
#emotion_img(img,faceClassif,model)

#Traductor
#traductor = traductor_es_en()
#traduccion = traductor.traducir('Hola, necesito un traductor')
#print(traduccion)

#Marc habla
hablando = voz()
hablando.hablar('Hola, soy marc')
