from transformers import BertTokenizer, TFBertForSequenceClassification
from transformers import InputExample, InputFeatures
import tensorflow as tf
import pandas as pd
import os
import shutil


class bert():
    def __init__(self) -> None:
        path = './back/resources/models/model_weights'
        self.model = TFBertForSequenceClassification.from_pretrained("bert-base-uncased")
        self.tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        self.model.load_weights(path)
            
    def predic(self, text):
        pred_sentences = [text]

        tf_batch = self.tokenizer(pred_sentences, max_length=128, padding=True, truncation=True, return_tensors='tf')
        tf_outputs = self.model(tf_batch)
        tf_predictions = tf.nn.softmax(tf_outputs[0], axis=-1)
        labels = ['Negative','Positive']
        label = tf.argmax(tf_predictions, axis=1)
        label = label.numpy()
        for i in range(len(pred_sentences)):
            return labels[label[i]]