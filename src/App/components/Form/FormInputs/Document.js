import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks";
import Input from "./Input";
import {
  validateCnpj,
  validateCpf,
  removeCnpjMask,
  removeCpfMask
} from "./helpers/utils";

const Document = ({
  id,
  formType,
  label,
  defaultValue,
  name = "entity.documentNumber",
  inputClass = ["form-control"],
  inputClassLabel = [],
  inputClassGroup = ["mb-3", "form-field"],
  isDisabled = false,
  helpInformation=""
}) => {

  const isLegalForm = formType === "PJ";
  const validateDoc = (value) =>
    isLegalForm
      ? validateCnpj(removeCnpjMask(value))
      : validateCpf(removeCpfMask(value));

  return (
    <ConnectForm>
      {({ control, setValue, errors }) => (
        <Controller
          control={control}
          defaultValue={defaultValue}
          id={id}
          name={name}
          setValue={setValue}
          render={({ field }) => (
            <Input
              {...field}
              id={id}
              inputClass={inputClass}
              ref={field.ref}
              label={label || (isLegalForm ? "CNPJ" : "CPF")}
              mask={isLegalForm ? "99.999.999/9999-99" : "999.999.999-99"}
              errors={errors}
              inputClassLabel={inputClassLabel}
              inputClassGroup={inputClassGroup}
              disabled={isDisabled}
              helpInformation={helpInformation}
            />
          )}
          rules={{
            required: true,
            validate: (value) => validateDoc(value) || "Documento Inválido"
          }}
        />
      )}
    </ConnectForm>
  );
};

Document.propTypes = {
  formType: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default Document;
