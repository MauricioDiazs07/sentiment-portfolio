from core.video.utils.pre_process_img import pre_process
class emotion_img():
    def __init__(self, img, FC, model):
        pre_process_class = pre_process(FC,model)
        img= pre_process_class.pre_process(img)
        pre_process_class.detectar_emociones()
        self.img = pre_process_class.dibujar_emocion(img)
        # show_img(img)
        # waitKey()
        # destroyAllWindows()
        
    def get_img(self):
        return self.img