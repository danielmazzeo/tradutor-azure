
document.addEventListener('DOMContentLoaded', () => {

    const backendApiUrl = 'https://tradutordomazzeo-e4bncnakbvd4arez.brazilsouth-01.azurewebsites.net/api/translate';


    const textToTranslateEl = document.getElementById('text-to-translate');
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    async function translateText() {

        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return;
        }

        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = '';

        try {
            const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend/api/tran
                method: 'POST',
                headers: {
                    // <-- Cabeçalhos de autenticação REMOVIDOS
                    'Content-type': 'application/json'
                },
                // <-- O corpo agora usa o formato que NOSSA API espera
                body: JSON.stringify({
                    'text': textToTranslate,
                    'to': toLanguage,
                    'from': fromLanguage
                })
            });


            const data = await response.json();

            // Verificamos o status da resposta diretamente
            if (!response.ok) {
                throw new Error(data.error || 'Ocorreu um erro no servidor.');
            }

            // Acessamos a tradução de forma muito mais direta
            const translation = data.translation;

            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!';

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        }
    }
    translateBtn.addEventListener('click', translateText);

});