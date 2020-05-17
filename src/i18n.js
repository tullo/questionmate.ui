let translations = new Map();
translations.set('bev', 'Elektro')
translations.set('otto', 'Benzin')
translations.set('diesel', 'Diesel')
translations.set('phev', 'Hybrid')
translations.set('tgi', 'Erdgas')

function i18n(s) {
    if (translations.has(s)) {
        return translations.get(s)
    }

    return s;
}

export default i18n;