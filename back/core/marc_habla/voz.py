import pyttsx3
class voz():
    def __init__(self) -> None:
        # Initialize the converter
        self.converter = pyttsx3.init('sapi5')#Español
        self.converter.setProperty('rate', 150)
        # Set volume 0-1
        self.converter.setProperty('volume', 1)
        # Set Voice (Female)
        voices = self.converter.getProperty('voices')
        self.converter.setProperty('voice', voices[0].id)
        voices = self.converter.getProperty('voices')
        index = 0
        for voice in voices:
            print(f'index-> {index} -- {voice.name}')
            index +=1
        self.converter.runAndWait()
    def hablar(self, texto):
        self.converter.say(texto)
        self.converter.runAndWait()