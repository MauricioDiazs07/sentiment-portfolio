from transformers import BertTokenizer, TFBertForSequenceClassification
#from transformers import InputExample, InputFeatures
from tensorflow import nn
from tensorflow import argmax
from tensorflow import keras

class bert():
    def __init__(self,modelo_bert) -> None:
        self.model = modelo_bert.model
        self.tokenizer = modelo_bert.tokenizer 
    def predic(self,sentences2predict:list):
        tf_batch = self.tokenizer(sentences2predict, max_length=128, padding=True, truncation=True, return_tensors='tf')
        tf_outputs = self.model(tf_batch)
        tf_predictions = nn.softmax(tf_outputs[0], axis=-1)
        labels = ['Negative','Positive']
        label = argmax(tf_predictions, axis=1)
        label = label.numpy()
        #for i in range(len(sentences2predict)):
        #  print(sentences2predict[i], ": \n", labels[label[i]])
        predict = []
        for i,x in enumerate(label):
            predict.append(labels[x])
        return predict

class load_bert():
    def __init__(self) -> None:
        path = './back/resources/models/model_weights'
        """Descargar modelo"""
        self.model = TFBertForSequenceClassification.from_pretrained("bert-base-uncased")
        self.model.compile(optimizer=keras.optimizers.legacy.Adam(learning_rate=3e-5, epsilon=1e-08, clipnorm=1.0), 
              loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True), 
              metrics=[keras.metrics.SparseCategoricalAccuracy('accuracy')])
        self.tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        self.model.load_weights('./back/resources/models/model_weights')
