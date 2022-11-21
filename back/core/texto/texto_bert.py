import os.path
import numpy as np
import tensorflow as tf
import ktrain 
from ktrain import text

class bert():
    def __init__(self) -> None:
        model_path = './back/resources/models/model.h5'
        dataset = tf.keras.utils.get_file(fname="aclImdb_v1.tar.gz",
                                        origin="http://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz",
                                        extract=True)
        ##datatraining
        IMBD_DATADIR = os.path.join(os.path.dirname(dataset), 'aclImdb')
        #print(os.path.join(dataset))
        #print(IMBD_DATADIR)
        # we need the following variables
        (x_train, y_train), (x_test, y_test), preproc = text.texts_from_folder(datadir=IMBD_DATADIR,
                                                                            classes=['pos', 'neg'],
                                                                            maxlen=500,
                                                                            train_test_names=['train', 'test'],
                                                                            preprocess_mode='bert')
        # collect bert model returned by the text_classifier
        model = text.text_classifier(name='bert',
                                    train_data=(x_train, y_train),
                                    preproc=preproc)
        # multilabel = false, because we are using just two classes
        # construct the learner instance
        learner = ktrain.get_learner(model=model,
                                    train_data=(x_train, y_train),
                                    val_data=(x_test, y_test),
                                    batch_size=6) # because our maximum sequence length is 500
        learner.load_model(model_path)
        self.predictor = ktrain.get_predictor(learner.model, preproc)
        #self.predictor.get_classes()
    def predic(self,text):
        return self.predictor.predict(text)
