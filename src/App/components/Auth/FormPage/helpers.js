/* eslint-disable no-useless-escape */

const validateForm = (values, pathname, step1) => {
  const validateEmail = (value) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };

  const validatePassword = (value) => {
    let re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[a-zA-Z0-9\S]{8,}$/;
    return re.test(value);
  };

  const errors = {};

  if (!step1) {
    if (!validateEmail(values.email)) {
      errors.email = {
        message: "Por favor, informe um e-mail válido!"
      };
    }

    if (!validatePassword(values.password)) {
      errors.password = {
        message:
          "A sua senha precisa ter no mínimo 8 caracteres, com números, letras minúsculas, maiúsculas e caracteres especiais (@ * ! % ; : .)"
      };
    }
  }

  if (pathname === "/register") {
    const passwordRuleRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/;

    if(values.password && !passwordRuleRegex.test(values.password)) {
      errors.password = {
        message: "A sua senha precisa ter no mínimo 8 caracteres, com números, letras minúsculas, maiúsculas e caracteres especiais (@ * ! % ; : .)"
      }
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = {
        message: "As senhas não são iguais. Verifique as senhas."
      };
    }
  }

  return { errors };
};

const mapperError = (type) => {
  const possibleErrors = {
    signin: "Usuário inexistente ou senha inválida"
  };

  return possibleErrors[type] ?? "Erro Interno. Tente novamente mais tarde.";
};

export { validateForm, mapperError };
