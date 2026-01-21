// utils/profileValidation.js
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return "Nome é obrigatório";
  }
  if (name.length < 2) {
    return "Nome deve ter pelo menos 2 caracteres";
  }
  if (name.length > 40) {
    return "Nome deve ter no máximo 40 caracteres";
  }
  return ""; // Sem erro
};

export const validateAbout = (about) => {
  if (!about || !about.trim()) {
    return "Descrição é obrigatória";
  }
  if (about.length < 2) {
    return "Descrição deve ter pelo menos 2 caracteres";
  }
  if (about.length > 200) {
    return "Descrição deve ter no máximo 200 caracteres";
  }
  return ""; // Sem erro
};

// Função para validar o formulário completo
export const validateProfileForm = (name, about) => {
  const nameError = validateName(name);
  const aboutError = validateAbout(about);

  return {
    nameError,
    aboutError,
    isValid: !nameError && !aboutError,
  };
};
