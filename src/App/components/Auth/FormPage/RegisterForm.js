import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { validateForm, mapperError } from "./helpers";
import { useAuth } from "../provider/useAuth";
import LoadingIndicator from "../../LoadingIndicator";
import InputMask from "../../Form/FormInputs/Bootstrap/InputMask";
import Input from "../../Form/FormInputs/Bootstrap/Input";

const RegisterForm = ({ action, invite, buttonText = "Cadastrar" }) => {
  const [errors, setErrors] = useState(null);
  const [step, setStep] = useState(1);
  const [registerEmail, setRegisterEmail] = useState("");

  let location = useLocation();

  const { pathname } = location || "/";

  const auth = useAuth();

  useEffect(() => {
    if (invite) {
      if (registerEmail) {
        setStep(2);
      }
    }
  }, [invite, registerEmail]);


  const getErrorSubmit = useCallback(() => {
    const msg = auth?.error ? mapperError(auth.error.type) : null;
    if (msg) setErrors({ password: { message: msg } });
  }, [auth?.error]);

  useEffect(() => {
    getErrorSubmit();

    if (pathname === "/login") setStep(0);
  }, [getErrorSubmit, pathname]);

  const handleLoginValidate = useCallback(
      (values) => {
        const { errors } = validateForm(values, pathname, step);

        setErrors(errors);

        return {
          values,
          errors: errors || {}
        };
      },
      [pathname, step]
  );

  const { formState, control, handleSubmit } = useForm({
    mode: "all",
    resolver: handleLoginValidate
  });

  const onSubmit = async (event) => {
    return await action(event, step, () => setStep(2));
  };

  const isStepLogin = pathname === "/login";
  const isStepInvite = pathname === "/register" && step === 1;
  const isStepRegister = pathname === "/register" && step === 2;

  return (
      <>
        {formState.isSubmitting && <LoadingIndicator isFull={true} />}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {isStepLogin && (
              <>
                <Input
                    error={errors}
                    control={control}
                    type="email"
                    name="email"
                    defaultValue=""
                    placeholder="email"
                />

                <Input
                    error={errors}
                    control={control}
                    type="password"
                    name="password"
                    placeholder="password"
                    defaultValue=""
                />
              </>
          )}

          {isStepInvite && (
              <Input
                  error={errors}
                  control={control}
                  type="text"
                  name="inviteCode"
                  placeholder="Id do convite"
                  defaultValue=""
              />
          )}

          {isStepRegister && (
              <>
                <Input
                    control={control}
                    type="text"
                    name="name"
                    placeholder="Nome"
                    defaultValue=""
                />
                <InputMask
                    error={errors}
                    control={control}
                    name={"documentNumber"}
                    mask={"999.999.999.99"}
                    placeholder="CPF"
                />

                {registerEmail && (
                    <Input
                        error={errors}
                        control={control}
                        name="email"
                        type="email"
                        placeholder="email"
                        isDisabled={true}
                        defaultValue={registerEmail}
                    />
                )}

                <Input
                    error={errors}
                    control={control}
                    type="password"
                    name="password"
                    placeholder="password"
                    defaultValue=""
                />

                <Input
                    error={errors}
                    control={control}
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    defaultValue=""
                />
              </>
          )}

          <Form.Group className="mb-3" controlId="submit">
            <Row justify="center" width="100%">
              <Button
                  style={{ margin: "0 auto" }}
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="btn btn-primary white-button"
              >
                {step === 1 ? "Seguir" : buttonText}
              </Button>
            </Row>
          </Form.Group>
        </Form>
      </>
  );
};

export default RegisterForm;
