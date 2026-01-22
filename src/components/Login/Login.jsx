import { useState } from "react";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateLoginForm,
} from "../../utils/loginFormValidation";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, emailError: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors((prev) => ({
        ...prev,
        passwordError: validatePassword(value),
      }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, emailError: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({
      ...prev,
      passwordError: validatePassword(password),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Marca todos os campos como tocados
    setTouched({ email: true, password: true });

    // Valida o formulário completo
    const validation = validateLoginForm(email, password);
    setErrors({
      emailError: validation.emailError,
      passwordError: validation.passwordError,
    });

    // Se for válido, submete
    if (validation.isValid) {
      onLogin(email, password);
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <h2 className="auth__title">Entrar</h2>
        <div className="auth__field">
          <input
            className={`auth__input ${errors.emailError && touched.email ? "auth__input_error" : ""}`}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {errors.emailError && touched.email && (
            <span className="auth__error">{errors.emailError}</span>
          )}
        </div>
        <div className="auth__field">
          <input
            className={`auth__input ${errors.passwordError && touched.password ? "auth__input_error" : ""}`}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {errors.passwordError && touched.password && (
            <span className="auth__error">{errors.passwordError}</span>
          )}
        </div>
        <button
          className="auth__button"
          type="submit"
          disabled={
            !email || !password || errors.emailError || errors.passwordError
          }
        >
          Entrar
        </button>
        <p className="auth__text">
          Ainda não é membro?{" "}
          <Link to="/signup" className="auth__link">
            Inscreva-se aqui!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
