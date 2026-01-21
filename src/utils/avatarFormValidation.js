export const validateAvatarUrl = (url) => {
  // Aceita URLs válidas (http/https) com ou sem extensão de imagem
  const urlPattern = /^https?:\/\/.+/i;
  if (!url.trim()) return "URL é obrigatória";
  if (!urlPattern.test(url)) return "URL deve ser válida (http:// ou https://)";
  return "";
};

export const validateAvatarForm = (url) => {
  const urlError = validateAvatarUrl(url);

  return {
    urlError,
    isValid: !urlError,
  };
};
