from cv2 import waitKey
class open_camera():
    def __init__(self, cap):
        self.cap = cap
        
    
    def get_image(self):
        ret, frame = self.cap.read() 
        return frame