export const Utterance = {
    "es": {
        "greeting": "Hola, soy María, ¿en qué puedo ayudarte?",
        "image": "Para comenzar, suba una imagen de su computadora y envíela. Espere unos segundos y verá el análisis en pantalla",
        "video": "A continuación, podrá ver la imagen captada por su cámara en donde se clasificará la emoción actual.",
        "text": "Para comenzar a escribir, escriba su texto.",
        "voice": "Para comenzar a escribir, sólo diga su texto.",
        "positive": "Su texto es positivo",
        "negative": "Su texto es negativo",
        "listenInstruction": "Está bien",
    },
    "en": {
        "greeting": "Hola, soy María, ¿en qué puedo ayudarte?",
        "image": "Para comenzar, suba una imagen de su computadora y envíela. Espere unos segundos y verá el análisis en pantalla",
        "video": "A continuación, podrá ver la imagen captada por su cámara en donde se clasificará la emoción actual.",
        "text": "Para comenzar a escribir, escriba su texto.",
        "voice": "Para comenzar a escribir, sólo diga su texto.",
        "positive": "Su texto es positivo",
        "negative": "Su texto es negativo",
        "listenInstruction": "Está bien",
    },
    "de": {
        "greeting": "Hola, soy María, ¿en qué puedo ayudarte?",
        "image": "Para comenzar, suba una imagen de su computadora y envíela. Espere unos segundos y verá el análisis en pantalla",
        "video": "A continuación, podrá ver la imagen captada por su cámara en donde se clasificará la emoción actual.",
        "text": "Para comenzar a escribir, escriba su texto.",
        "voice": "Para comenzar a escribir, sólo diga su texto.",
        "positive": "Su texto es positivo",
        "negative": "Su texto es negativo",
        "listenInstruction": "Está bien",
    },
    "fr": {
        "greeting": "Hola, soy María, ¿en qué puedo ayudarte?",
        "image": "Para comenzar, suba una imagen de su computadora y envíela. Espere unos segundos y verá el análisis en pantalla",
        "video": "A continuación, podrá ver la imagen captada por su cámara en donde se clasificará la emoción actual.",
        "text": "Para comenzar a escribir, escriba su texto.",
        "voice": "Para comenzar a escribir, sólo diga su texto.",
        "positive": "Su texto es positivo",
        "negative": "Su texto es negativo",
        "listenInstruction": "Está bien",
    },
}

export function getUtterances(lang: string) {
    if (lang) {
        return Object(Utterance)[lang];
    }

    return Object(Utterance)['es'];
}