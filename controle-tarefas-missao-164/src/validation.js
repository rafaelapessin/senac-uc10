/* validation.js — validação dos dados
Verifica se o título foi informado, remove espaços desnecessários e impede títulos com mais de 120 caracteres. Evita que dados inválidos sejam enviados para o banco. */

// Se o título for uma string, remove os espaços em branco
// Senão, retorna uma string vazia
function normalizeTitle(title) {
  return typeof title === 'string' ? title.trim() : '';
}

// Validação dos dados da tarefa
function validateTaskInput(input) {

  const title = normalizeTitle(input?.title);

  // Se título estiver vazio, avisa que ´título e obrigatório
  if (!title) {
    throw new Error('O título da tarefa é obrigatório.');
  }
  // Se o título tiver mais de 120 caratteres, gera um erro
  if (title.length > 120) {
    throw new Error('O título deve ter no máximo 120 caracteres.');
  }

  // Se a descrição for uma string, remove os espaços em branco
  // Senão, retorna uma string vazia
  const description = typeof input?.description === 'string'
    ? input.description.trim() : '';

  return { valid: true, data: { title, description } };
}

// Exporta as duas funções para que elas possam ser usadas em outros arquivos do seu projeto Node.js
module.exports = { normalizeTitle, validateTaskInput };
