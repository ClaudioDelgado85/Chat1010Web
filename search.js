// Utility functions
const utils = {
    removeDiacritics: (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    
    scrollToResults: () => {
        document.getElementById('resultados').scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest'
        });
    }
};

// Search functionality
class SearchManager {
    constructor() {
        this.preguntasRespuestas = [];
        this.init();
    }

    async init() {
        try {
            const response = await fetch('infracciones_generales.txt');
            const text = await response.text();
            this.preguntasRespuestas = text.split('\n').map(linea => ({ 
                texto: linea.trim() 
            }));
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
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

        // Reinicia la animación
        resultadosDiv.style.animation = 'none';
        resultadosDiv.offsetHeight; // Trigger reflow
        resultadosDiv.style.animation = null;
    }
}

// Initialize search manager
const searchManager = new SearchManager();

// Event handlers
function buscar() {
    const palabraClave = document.getElementById('palabraClave').value;
    searchManager.search(palabraClave);
    utils.scrollToResults();
}

function buscarPalabra(palabra) {
    document.getElementById('palabraClave').value = palabra;
    buscar();
}

function limpiar() {
    document.getElementById('palabraClave').value = '';
    document.getElementById('resultados').innerHTML = '';
    document.getElementById('sugerencias').style.display = 'none';
}

function abrirPDF() {
    window.open('Ordenanza_1010_2022.PDF', '_blank');
}

// Event listeners
document.getElementById('palabraClave').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        buscar();
    }
});