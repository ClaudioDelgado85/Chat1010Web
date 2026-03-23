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
                const div = document.createElement('div');
                div.className = 'result-card';
                
                // Extraer el número de artículo (ej. "25.1" o "27.1.1.1") y el texto
                const match = result.texto.match(/^([\d\.]+)\s+(.*)/);
                
                if (match) {
                    const articleNumber = match[1];
                    const articleText = match[2];
                    
                    const header = document.createElement('div');
                    header.className = 'article-number';
                    header.textContent = `Art. ${articleNumber}`;
                    
                    const text = document.createElement('div');
                    text.className = 'article-text';
                    text.textContent = articleText;
                    
                    div.appendChild(header);
                    div.appendChild(text);
                } else {
                    const text = document.createElement('div');
                    text.className = 'article-text';
                    text.textContent = result.texto;
                    div.appendChild(text);
                }
                
                this.elements.resultsDiv.appendChild(div);
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