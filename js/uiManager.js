export class UIManager {
    constructor() {
        this.elements = {
            searchInput: document.getElementById('palabraClave'),
            resultsDiv: document.getElementById('resultados'),
            suggestionsDiv: document.getElementById('sugerencias'),
            commonInfractions: document.querySelector('.common-infractions')
        };
    }

    displayResults(results, searchQuery) {
        this.elements.resultsDiv.innerHTML = '';
        this.elements.suggestionsDiv.style.display = 'none';

        if (results.length > 0) {
            results.forEach(result => {
                const p = document.createElement('p');
                p.textContent = result.texto;
                this.elements.resultsDiv.appendChild(p);
            });
        } else {
            this.showNoResults(searchQuery);
        }
    }

    showNoResults(searchQuery) {
        this.elements.resultsDiv.innerHTML = `
            <p><strong>No se encontraron resultados para "${searchQuery}"</strong>
            <br>Intenta con otros términos o revisa las sugerencias.</p>
        `;
        this.elements.suggestionsDiv.style.display = 'block';
    }

    setSearchValue(value) {
        this.elements.searchInput.value = value;
    }

    clearSearch() {
        this.elements.searchInput.value = '';
        this.elements.resultsDiv.innerHTML = '';
        this.elements.suggestionsDiv.style.display = 'none';
    }

    toggleInfractions() {
        this.elements.commonInfractions.classList.toggle('collapsed');
    }
}