import { utils } from './utils.js';

class SearchManager {
    constructor() {
        this.preguntasRespuestas = [];
        this.init();
    }

    async init() {
        try {
            const response = await fetch('infracciones_generales.txt');
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de infracciones');
            }
            const text = await response.text();
            this.preguntasRespuestas = text.split('\n')
                .filter(line => line.trim()) // Remove empty lines
                .map(linea => ({ texto: linea.trim() }));
            console.log('Datos cargados exitosamente:', this.preguntasRespuestas.length, 'infracciones');
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            utils.showError('No se pudieron cargar los datos. Por favor, recarga la página.');
        }
    }

    search(palabraClave) {
        const normalizedQuery = utils.removeDiacritics(palabraClave.trim().toLowerCase());
        const resultadosDiv = document.getElementById('resultados');
        const sugerenciasDiv = document.getElementById('sugerencias');
        
        resultadosDiv.innerHTML = '';
        sugerenciasDiv.style.display = 'none';

        if (!normalizedQuery) return;

        const results = this.preguntasRespuestas.filter(pr => 
            utils.removeDiacritics(pr.texto.toLowerCase()).includes(normalizedQuery)
        );

        if (results.length > 0) {
            results.forEach(result => {
                const p = document.createElement('p');
                p.textContent = result.texto;
                resultadosDiv.appendChild(p);
            });
        } else {
            resultadosDiv.innerHTML = `
                <p><strong>No se encontraron resultados para "${palabraClave}"</strong>
                <br>Intenta con otros términos o revisa las sugerencias.</p>
            `;
            sugerenciasDiv.style.display = 'block';
        }
    }
}

// Initialize and export search manager
export const searchManager = new SearchManager();