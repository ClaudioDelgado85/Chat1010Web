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
    
    // Ocultar teclado en móviles
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
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
        let debounceTimer;

        // Búsqueda en tiempo real mientras escribe
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            
            // Si borró todo, limpiamos la pantalla
            if (searchInput.value.trim() === '') {
                window.limpiar();
                return;
            }

            // Esperamos 300ms después de que deja de teclear para buscar
            debounceTimer = setTimeout(() => {
                const searchQuery = searchInput.value;
                const results = searchManager.search(searchQuery);
                ui.displayResults(results, searchQuery);
                // NOTA: Acá no ocultamos el teclado ni hacemos scroll automático
                // para que pueda seguir escribiendo cómodamente.
            }, 300);
        });

        // Mantenemos el Enter por si quiere forzar el scroll y ocultar el teclado
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                buscar();
            }
        });
    }
});