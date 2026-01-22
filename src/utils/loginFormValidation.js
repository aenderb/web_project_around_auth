export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "E-mail é obrigatório";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "E-mail inválido";
  }
  
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Senha é obrigatória";
  }
  
  if (password.length < 6) {
    return "Senha deve ter pelo menos 6 caracteres";
  }
  
  return "";
};

export const validateLoginForm = (email, password) => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  return {
    emailError,
    passwordError,
    isValid: !emailError && !passwordError,
  };
};
