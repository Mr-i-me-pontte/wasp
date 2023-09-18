import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks/FormHooks";
import Input from "./Input";

const Phone = ({
  id,
  label,
  defaultValue,
  name = "entity.documentNumber",
  inputClass = ["form-control"],
  inputClassLabel = [],
  inputClassGroup = ["mb-3", "form-field"],
  isDisabled = false,
  helpInformation = ""
}) => (
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
            label={label}
            mask={"(99) 9 9999-9999"}
            errors={errors}
            inputClassLabel={inputClassLabel}
            inputClassGroup={inputClassGroup}
            disabled={isDisabled}
            helpInformation={helpInformation}
          />
        )}
      />
    )}
  </ConnectForm>
);

Phone.propTypes = {
  formType: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default Phone;
