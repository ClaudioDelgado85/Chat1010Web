// Funciones de utilidad
export const utils = {
    removeDiacritics(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },

    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    normalizeText(text) {
        return this.removeDiacritics(text.trim().toLowerCase());
    }
};