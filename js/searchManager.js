import { utils } from './utils.js';

class SearchManager {
    constructor() {
        this.infractions = [];
    }

    async loadData(dataFile) {
        try {
            const response = await fetch(dataFile);
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de infracciones');
            }
            const text = await response.text();
            this.infractions = text.split('\n')
                .filter(line => line.trim())
                .map(line => ({ texto: line.trim() }));
            
            console.log('Datos cargados:', this.infractions.length, 'infracciones');
        } catch (error) {
            console.error('Error al cargar datos:', error);
            throw error;
        }
    }

    search(query) {
        if (!query) return [];
        
        const normalizedQuery = utils.normalizeText(query);
        
        return this.infractions.filter(infraction => 
            utils.normalizeText(infraction.texto).includes(normalizedQuery)
        );
    }
}

export const searchManager = new SearchManager();