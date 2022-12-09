export const Languages = {
    "es": "es-MX",
    "en": "en-US",
    "de": "de-DE",
    "fr": "fr-FR"
}

export function getLanguage(lang: string): string {
    return Object(Languages)[lang];
}

export function getAllLanguages(): string[] {
    return Object.keys(Languages);
}