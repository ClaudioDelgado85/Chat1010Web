import { CONFIG } from './config.js';
import { searchManager } from './searchManager.js';
import { UIManager } from './uiManager.js';
import { utils } from './utils.js';

const ui = new UIManager();

// Inicialización
async function init() {
    try {
        await searchManager.loadData(CONFIG.dataFile);
    } catch (error) {
        ui.elements.resultsDiv.innerHTML = `
            <p class="error-message">
                <strong>Error:</strong> No se pudieron cargar los datos. Por favor, recarga la página.
            </p>
        `;
    }
}

// Funciones principales
window.buscar = () => {
    const searchQuery = ui.elements.searchInput.value;
    const results = searchManager.search(searchQuery);
    ui.displayResults(results, searchQuery);
    utils.scrollToElement('resultados');
};

window.buscarPalabra = (palabra) => {
    ui.setSearchValue(palabra);
    buscar();
};

window.limpiar = () => {
    ui.clearSearch();
};

window.abrirPDF = () => {
    window.open(CONFIG.pdfFile, '_blank');
};

window.toggleInfractions = () => {
    ui.toggleInfractions();
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    const searchInput = ui.elements.searchInput;
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                buscar();
            }
        });
    }
});