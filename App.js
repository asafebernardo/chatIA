document.querySelector('.formulario').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    // Normaliza a entrada do usuário
    const input = document.getElementById('meuInput').value.trim().toLowerCase().replace(/\s+/g, '');
    if (!input) return;
  
    // Verifica qual aba está ativa
    const isApiTabActive = document.getElementById('apiTab').classList.contains('active');
    const container = isApiTabActive
      ? document.getElementById('conteudoApi')
      : document.getElementById('conteudoIntegrações');
  
    // Define o caminho do arquivo com base na aba ativa
    const arquivoJSON = isApiTabActive ? 'dados.json' : 'dados2.json';
  
    try {
      const response = await fetch(arquivoJSON);
      const dados = await response.json();
  
      // Filtra objetos com algum campo exatamente igual ao input
      const resultados = dados.filter(item => {
        return Object.values(item).some(valor =>
          typeof valor === 'string' &&
          valor.toLowerCase().replace(/\s+/g, '') === input
        );
      });
  
      // Exibe os resultados
      if (resultados.length > 0) {
        container.innerHTML = `
          <p><strong>${resultados.length} resultado(s) encontrado(s):</strong></p>
          ${resultados.map(item => `
            <div class="card">
              ${Object.entries(item).map(([chave, valor]) => `
                <p><strong>${chave}:</strong> ${valor}</p>
              `).join('')}
            </div>
          `).join('')}
        `;
      } else {
        container.innerHTML = `<p>Nenhum resultado encontrado para "${input}".</p>`;
      }
  
      // Limpa o input
      document.getElementById('meuInput').value = '';
    } catch (err) {
      console.error('Erro ao carregar o JSON:', err);
      container.innerHTML = `<p>Erro ao carregar os dados.</p>`;
    }
  });
  