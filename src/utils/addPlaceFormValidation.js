// utils/cardValidation.js
export const validateCardTitle = (title) => {
  if (!title.trim()) return "Título é obrigatório";
  if (title.length < 2) return "Título deve ter pelo menos 2 caracteres";
  if (title.length > 30) return "Título muito longo";
  return "";
};

export const validateCardImageUrl = (url) => {
  // Aceita URLs válidas (http/https) com ou sem extensão de imagem
  const urlPattern = /^https?:\/\/.+/i;
  if (!url.trim()) return "URL da imagem é obrigatória";
  if (!urlPattern.test(url)) return "URL deve ser válida (http:// ou https://)";
  return "";
};

// Função para validar o formulário completo
export const validateAddPlaceForm = (title, url) => {
  const titleError = validateCardTitle(title);
  const urlError = validateCardImageUrl(url);

  return {
    titleError,
    urlError,
    isValid: !titleError && !urlError,
  };
};
