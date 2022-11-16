from cv2 import rectangle, COLOR_BGR2GRAY, cvtColor, resize, INTER_AREA, imread
from numpy import reshape, argmax

class pre_process():
    def __init__(self,FC,model):
        self.faceClassif = FC
        self.model = model
        img_emociones = imread('./back/data/video/emociones.png')
        tamano=120
        img_feliz = img_emociones[40:40+tamano, 130:130+tamano]
        img_enojo = img_emociones[161:161+tamano, 259:259+tamano]
        img_asco = img_emociones[282:282+tamano, 258:258+tamano]
        img_miedo = img_emociones[40:40+tamano, 647:647+tamano]
        img_neutro = img_emociones[160:160+tamano, 388:388+tamano]
        img_sorpresa = img_emociones[281:281+tamano, 0:0+tamano]
        img_tristeza = img_emociones[403:403+tamano, 0:0+tamano]
        self.emociones_dibujo = [img_asco,img_feliz,img_enojo,img_miedo,img_neutro,img_sorpresa,img_tristeza]
        self.mask = False
    def pre_process(self, img):
        self.img = img
        self.img_gray = cvtColor(self.img, COLOR_BGR2GRAY)
        self.detectar_rostro()
        
        return self.img
        
    
    def detectar_rostro(self):
        caras = self.faceClassif.detectMultiScale(self.img_gray)
        if len(caras)>0:
            (x,y,w,h) = caras[-1]
            rectangle(self.img,(x, y),(x+w,y+h),(0,255,0),1)
            self.face = True
        else:
            x,y,w,h = 0,0,0,0
            self.face = False
        self.coordenadas = (x,y,w,h)
        
    
    def detectar_emociones(self):
        if self.face:
            self.mask=True
            (x,y,w,h) = self.coordenadas
            img_pre = self.img_gray[y:y+h, x:x+w]
            img_pre = resize(img_pre, (48,48), interpolation = INTER_AREA)
            img_pre = reshape(img_pre,[48,48,1])
            img_pre = reshape(img_pre,[1,48,48,1])
            img_pre = img_pre.astype('float32')/255
            prediction = self.model.predict(img_pre, verbose = 1)
            self.etiqueta =argmax(prediction, axis=1)

        else:
            self.mask=False
            self.etiqueta = -1
    
    def dibujar_emocion(self,img):
        if self.mask:
            img[0:120,0:120] = self.emociones_dibujo[int(self.etiqueta)]
        else:
            pass
        return img

