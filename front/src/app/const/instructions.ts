export const Instructions = {
    "es": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye)[\s]+(maria)/,
        "stopListening": /(^|[\n\s])(nada)/,
        "pages": {
            "main": /(^|[\n\s])(lleva|vamos|manda|pon|quiero|envia)[A-Za-z\s]+(menu|principal)/,
            "video": /(^|[\n\s])(lleva|vamos|manda|pon|quiero|envia)[A-Za-z\s]+(video)/,
            "image": /(^|[\n\s])(lleva|vamos|manda|pon|quiero|envia)[A-Za-z\s]+(imagen)/,
            "text": /(^|[\n\s])(lleva|vamos|manda|pon|quiero|envia)[A-Za-z\s]+(texto)/,
            "voice": /(^|[\n\s])(lleva|vamos|manda|pon|quiero|envia)[A-Za-z\s]+(vo)[sz]/
        },
        "text": {
            "clean": /(^|[\n\s])(borra)[\sr]+(todo)/,
            "analyze": /(^|[\n\s])(anali)[aeilrosz\s]+(texto)/
        }
    },
    "en": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye)[\s]+(maria)/,
        "stopListening": /(^|[\n\s])(nothing)/,
        "pages": {
            "main": /(^|[\n\s])(take|send)[A-Za-z\s]+(main|menu)/,
            "video": /(^|[\n\s])(take|send)[A-Za-z\s]+(video)/,
            "image": /(^|[\n\s])(take|send)[A-Za-z\s]+(image)/,
            "text": /(^|[\n\s])(take|send)[A-Za-z\s]+(text)/,
            "voice": /(^|[\n\s])(take|send)[A-Za-z\s]+(voice)/
        },
        "text": {
            "clean": /(^|[\n\s])(clean)[the\sr]+(page|everything|screen)/,
            "analyze": /(^|[\n\s])(analyze)[dthe\s]+(text)/
        }
    },
    "de": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye|hallo)[\s]+(maria)/,
        "stopListening": /(^|[\n\s])(nichts)/,
        "pages": {
            "main": /(^|[\n\s])(gehen wir|weiter)[zurm\sa]+(haupt|hauptmenu|beginnen)/,
            "video": /(^|[\n\s])(gehen wir|weiter)[zurm\sa]+(video)/,
            "image": /(^|[\n\s])(gehen wir|weiter)[zurm\sa]+(bild)/,
            "text": /(^|[\n\s])(gehen wir|weiter)[zurm\sa]+(text)/,
            "voice": /(^|[\n\s])(gehen wir|weiter)[zurm\sa]+(stimme)/
        },
        "text": {
            "clean": /(^|[\n\s])(lösch)[\stralles]+/,
            "analyze": /(^|[\n\s])(analisiert)[denr\s]+(text)/
        }
    },
    "fr": {
        "calling": /(^|[\n\s])(salut)[\s]+(maria)/,
        "stopListening": /(^|[\n\s])(rien)/,
        "pages": {
            "main": /(^|[\n\s])(emmenez|prenez|prends)[-\s](moi)[\sal]+(page|principal)/,
            "video": /(^|[\n\s])(emmenez|prenez|prends)[-\s](moi)[\sal]+(video)/,
            "image": /(^|[\n\s])(emmenez|prenez|prends)[-\s](moi)[\sal']+(image)/,
            "text": /(^|[\n\s])(emmenez|prenez|prends)[-\s](moi)[\salu]+(texte)/,
            "voice": /(^|[\n\s])(emmenez|prenez|prends)[-\s](moi)[\sal]+(voix)/
        },
        "text": {
            "clean": /(^|[\n\s])(supprime|nettoie)[\sr'le]+(écran)/,
            "analyze": /(^|[\n\s])(analyse)[ledu\s]+(texte)/
        }
    }
}

export function getInstructions(lang: string) {
    if (lang in Instructions) {
        return Object(Instructions)[lang];
    }

    return Object(Instructions)['es'];
}