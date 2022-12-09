from core.video.main_video import bucle_video
from core.imagen.main_imagen import emotion_img
from core.traductor.traductor import traductor_es_en
from core.texto.texto_bert import bert,load_bert
from core.marc_habla.voz import voz
#from cv2 import CascadeClassifier
#import tensorflow as tf


#Load principal datas and models
#faceClassif = CascadeClassifier('./back/data/models/haarcascade_frontalface_default.xml')
#model = tf.keras.models.load_model('./back/data/models/0.606854_1.107095.hdf5')
model_bert = load_bert()

#Correr video
#camara_numero = 0
#video_class = bucle_video(camara_numero,faceClassif,model)
#video_class.star_video()


#Correr imagen
#from cv2 import imread
#img = imread('./back/data/img/sor.jpg')
#emotion_img(img,faceClassif,model)

#Traductor
traductor = traductor_es_en()
#traduccion = traductor.traducir('Hola, necesito un traductor')
#print(traduccion)

#Marc habla
#hablando = voz()
#hablando.hablar('Hola, soy marc')


#Bert
Bert = bert(model_bert)
respuesta = Bert.predic([traductor.traducir('NO Me gustó el producto')])
print(respuesta)

