export const Instructions = {
    "es": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye)[\s]+(maria)/,
        "instruction": ['vamos', 'llevame', 'mandame', 'ponme', 'quiero', 'enviame']
    },
    "en": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye)[\s]+(maria)/,
        "instruction": ['send me', 'take me']
    },
    "de": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye)[\s]+(maria)/,
        "instruction": ['vamos', 'llevame', 'mandame', 'ponme', 'quiero', 'enviame']
    },
    "fr": {
        "calling": /(^|[\n\s])(hey|ey|ay|oye)[\s]+(maria)/,
        "instruction": ['vamos', 'llevame', 'mandame', 'ponme', 'quiero', 'enviame']
    }
}

export function getInstructions(lang: string) {
    return Object(Instructions)[lang];
}