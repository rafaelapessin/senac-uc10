// Esta função extrai os campos do formulário
function validateLead({ name, email, phone, interest }) {
  
  // Cria um vetor que vai acumular os problemas encontrados ao longo da validação
  const errors = [];

  // Validação do nome: Verifica se o nome não é uma string ou se tem menos de 3 caracteres
  if (typeof name !== "string" || name.trim().length < 3) {
    errors.push("Informe seu nome (mínimo de 3 caracteres).");
  }

  // Validação de e-mail: Verifica se o e-mail não é uma string ou se ele não passa
  // no teste de validação de e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // validação de e-mail
  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    errors.push("Informe um e-mail válido.");
  }

  // Validação de telefone: Verifica se o telefone foi preenchido no formulário e se o tipo
  // da variável "phone" é diferente de string
  if (phone && typeof phone !== "string") {
    errors.push("Preencha o telefone corretamente.");
  }

  // Cria um vetor com as opções de modalidade de curso
  const allowedInterests = ["Online", "Presencial", "Ainda não sei"];
  // Validação de modalidade de curso: Verifica se a modalidade de interesse foi preenchida e
  // se a opção enviada não está na lista de permitidos
  if (interest && !allowedInterests.includes(interest)) {
    errors.push("Selecione uma modalidade válida.");
  }
  
  // O total de erros acumulados é igual a zero?
  // Se for igual a zero = true; senão = false
  return { valid: errors.length === 0, errors };
  /* Exemplos:
    Caso 1: a validação retornou erro
    {
      valid: false,
      errors: ["m1, "m2", "m3", ...]   -- length > 0
    }
    Caso 2: a validação teve sucesso (sem erros)
    {
      valid: true,
      errors: []   -- length = 0
    }
  */
}

function normalizeCourseFilter(modality) {
  if (!modality || modality === "Todos") return null;
  const allowed = ["Online", "Presencial"];
  return allowed.includes(modality) ? modality : null;
}

module.exports = { validateLead, normalizeCourseFilter };
