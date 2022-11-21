from googletrans import Translator
class traductor_es_en():
    def __init__(self) -> None:
        self.translator = Translator() 
    def traducir(self, texto):
        txt=self.translator.translate(texto).text
        return txt



