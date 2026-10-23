/* validation.js — validação dos dados
Verifica se o título foi informado, remove espaços desnecessários e impede títulos com mais de 120 caracteres.
Evita que dados inválidos sejam enviados para o banco. */

function normalizeTitle(title) {
  return typeof title === 'string' ? title.trim() : '';
}

function validateTaskInput(input) {
  const title = normalizeTitle(input?.title);
  if (!title) {
    return { valid: false, error: 'O título da tarefa é obrigatório.' };
  }
  if (title.length > 120) {
    return { valid: false, error: 'O título deve ter no máximo 120 caracteres.' };
  }
  const description = typeof input?.description === 'string'
    ? input.description.trim()
    : '';
  return { valid: true, data: { title, description } };
}

module.exports = { normalizeTitle, validateTaskInput };
