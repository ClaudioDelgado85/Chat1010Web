let preguntasRespuestas = [];

// Cargar desde un archivo en el servidor
function cargarDesdeArchivo() {
    fetch('infracciones_generales.txt')
        .then(response => response.text())
        .then(text => {
            preguntasRespuestas = text.split('\n').map(linea => ({ texto: linea.trim() }));
        })
        .catch(error => console.error('Error al cargar el archivo:', error));
}

// Elige qué método de carga usar
cargarDesdeArchivo();  // Usamos esta opción por defecto para el ejemplo

function removeDiacritics(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function buscar() {
    const palabraClave = removeDiacritics(document.getElementById('palabraClave').value.trim().toLowerCase());
    const resultadosDiv = document.getElementById('resultados');
    const sugerenciasDiv = document.getElementById('sugerencias');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores
    sugerenciasDiv.style.display = 'none';

    if (palabraClave === '') return;

    let seEncontraronCoincidencias = false;

    preguntasRespuestas.forEach(pr => {
        const textoNormalizado = removeDiacritics(pr.texto.toLowerCase());
        if (textoNormalizado.includes(palabraClave)) {
            resultadosDiv.innerHTML += `<p>${pr.texto}</p>`;
            seEncontraronCoincidencias = true;
        }
    });

    if (!seEncontraronCoincidencias) {
        resultadosDiv.innerHTML = "<p><strong>LO SIENTO NO SE ENCONTRARON RESULTADOS para la palabra ingresada.</strong><br>Puedes intentar nuevamente utilizando sinónimos o ver sugerencias.</p>";
        
        // Mostrar sugerencias
        sugerenciasDiv.style.display = 'block';
    }
}

function buscarPalabra(palabra) {
    document.getElementById('palabraClave').value = palabra; // Establece la palabra clave en el campo de entrada
    buscar(); // Llama a la función buscar

    // Desplazarse hacia el área de resultados
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave hacia los resultados
}
function limpiar() {
    document.getElementById('palabraClave').value = '';
    document.getElementById('resultados').innerHTML = '';
}

function abrirPDF() {
    // Asume que el PDF está en el servidor
    window.open('Ordenanza_1010_2022.PDF', '_blank');
}

// Añadir evento para enviar la búsqueda al presionar Enter
document.getElementById('palabraClave').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscar(); // Llama a la función buscar cuando se presiona Enter
        event.preventDefault(); // Evita el comportamiento por defecto del Enter
    }
});