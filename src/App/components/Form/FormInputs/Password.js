import React from "react";
import { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks/FormHooks";
import Input from "./Input";

const Password = ({
  id,
  label,
  name = "password",
  inputClass = ["form-control"],
  inputClassLabel = [],
  inputClassGroup = ["mb-3", "form-field", "position-relative"],
  isDisabled=false,
  helpInformation = ""
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    let updatedVisibility = !passwordVisible
    setPasswordVisible(updatedVisibility)
    setPasswordType(updatedVisibility ? "text": "password");
  }

  return (
  <ConnectForm>
    {({ control, setValue, errors }) => (
      <>
        <Controller
          control={control}
          defaultValue={""}
          id={id}
          name={name}
          setValue={setValue}
          cssClass="mb-3"
          render={({ field }) => (
            <>
              <Input
                {...field}
                id={id}
                inputClass={inputClass}
                label={label}
                name={name}
                type={passwordType}
                errors={errors}
                inputClassLabel={inputClassLabel}
                inputClassGroup={inputClassGroup}
                role="textbox"
                disabled={isDisabled}
                helpInformation={helpInformation}
                containerClassName="position-relative"
                domChildren={(
                  <a href="!#" className="change-password-visibility-icon" onClick={togglePasswordVisibility}>
                    {!passwordVisible && <i class="fa fa-light fa-eye"></i>}
                    {passwordVisible && <i class="fa fa-light fa-eye-slash"></i>}
                  </a>
                )}
              />
            </>
          )}
          rules={{
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[a-zA-Z0-9\S]{8,}$/,
              message:
                "A sua senha precisa ter no mínimo 8 caracteres, com números, letras minúsculas, maiúsculas e caracteres especiais (@ * ! % ; : .)"
            }
          }}
        />
      </>
    )}
  </ConnectForm>
)};

Password.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default Password;
