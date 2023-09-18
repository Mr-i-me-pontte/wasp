import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks/FormHooks";
import Input from "./Input";

const Email = ({
  id,
  label,
  name,
  defaultValue,
  inputClass = ["form-control"],
  inputClassLabel = [],
  inputClassGroup = ["mb-3", "form-field"],
  isDisabled = false,
  helpInformation = ""
}) => {
  return (
    <ConnectForm>
      {({ control, setValue, errors }) => (
        <>
          <Controller
            control={control}
            defaultValue={defaultValue}
            id={id}
            name={name}
            setValue={setValue}
            cssClass="mb-3"
            render={({ field }) => (
              <Input
                {...field}
                id={id}
                inputClass={inputClass}
                ref={field.ref}
                label={label}
                type="email"
                errors={errors}
                inputClassLabel={inputClassLabel}
                inputClassGroup={inputClassGroup}
                disabled={isDisabled}
                defaultValue={defaultValue}
                helpInformation={helpInformation}
              />
            )}
            rules={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Por favor, informe um e-mail válido!"
              }
            }}
          />
        </>
      )}
    </ConnectForm>
  );
};

Email.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default Email;
