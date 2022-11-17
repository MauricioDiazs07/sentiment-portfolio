from core.video.utils.open_camera import open_camera
from core.video.utils.pre_process_img import pre_process
from core.video.utils.show_img import show_img
from cv2 import VideoCapture, destroyAllWindows, waitKey, COLOR_BGR2RGB,cvtColor


class bucle_video():
    def __init__(self, numero_camara, FC, MOD, hands) -> None:
        self.cap = VideoCapture(numero_camara)
        self.FC = FC
        self.model = MOD
        self.hands = hands
    def star_video(self):
        camara = open_camera(self.cap)
        pre_process_class = pre_process(self.FC,self.model)
        i=0
        with self.hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.5) as hands:
            while True:
                i+=1
                img = camara.get_image()
                img= pre_process_class.pre_process(img)
                results = hands.process(cvtColor(img,COLOR_BGR2RGB))
                change_emoji = False
                if results.multi_hand_landmarks == 2:
                    change_emoji = True
                    print('manitas')
                
                if waitKey(1) == 27:
                    break
                if i%12 == 0:
                    i=0
                    pre_process_class.detectar_emociones()
                img = pre_process_class.dibujar_emocion(img)
                show_img(img)
                
            self.cap.release()
            destroyAllWindows()