function validateLead({ name, email, phone, interest }) {
  const errors = [];

  if (typeof name !== "string" || name.trim().length < 2) {
    errors.push("Informe seu nome (mínimo de 2 caracteres).");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    errors.push("Informe um e-mail válido.");
  }

  if (phone && typeof phone !== "string") {
    errors.push("O telefone deve ser um texto.");
  }

  const allowedInterests = ["Online", "Presencial", "Ainda não sei"];
  if (interest && !allowedInterests.includes(interest)) {
    errors.push("Selecione uma modalidade válida.");
  }

  return { valid: errors.length === 0, errors };
}

function normalizeCourseFilter(modality) {
  if (!modality || modality === "Todos") return null;
  const allowed = ["Online", "Presencial"];
  return allowed.includes(modality) ? modality : null;
}

module.exports = { validateLead, normalizeCourseFilter };
