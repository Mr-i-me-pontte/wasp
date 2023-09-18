import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import FormPage from "../../../components/Auth/FormPage";
import { useAuth } from "../../../components/Auth";

export const getUserInitialRoute = (user) => {
  const isAdmin = user.cognitoGroups?.includes("Pontte_Users");
  return isAdmin ? "/private/dashboard" : "/private/help";
};

const RegisterPage = () => {
  let auth = useAuth({
    defaultValue: {
      email: "jonny@appleseed.com",
      password: "xxx",
      isAuthenticated: false
    }
  });

  const navigate = useNavigate();

  const props = {
    headerText: "Faça agora o seu login",
    left: {
      title: "Já está cadastrado?",
      buttonText: "Entrar",
      action: (event) =>
          auth.signin(event, (user) => {
            const route = getUserInitialRoute(user)
            navigate(route);
          })
    },
    right: {
      title: "Ainda não tem uma conta?",
      buttonText: "Cadastrar",
      action: () => navigate("/register")
    },

    children: []
  };

  return (
      <>
        <FormPage {...props} />
      </>
  );
};

export default RegisterPage;