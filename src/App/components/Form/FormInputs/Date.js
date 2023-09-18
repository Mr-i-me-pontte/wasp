import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks";
import Input from "./Input";
import { changeFormatDateStr } from "../../../helpers/formats";

const Date = ({
  id,
  label,
  name,
  inputClass = ["form-control"],
  defaultValue = "",
  inputClassLabel = [],
  inputClassGroup = ["mb-3", "form-field"],
  isDisabled=false,
  helpInformation = ""
}) => {
  return (
    <ConnectForm>
      {({ control, setValue, errors }) => (
        <>
          <Controller
            control={control}
            defaultValue={changeFormatDateStr(defaultValue)}
            id={id}
            name={name}
            setValue={setValue}
            cssClass="mb-3"
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id={id}
                  role="textbox"
                  inputClass={inputClass}
                  label={label}
                  name={name}
                  type="date"
                  inputClassLabel={inputClassLabel}
                  inputClassGroup={inputClassGroup}
                  errors={errors}
                  disabled={isDisabled}
                  helpInformation={helpInformation}
                />
              </>
            )}
          />
        </>
      )}
    </ConnectForm>
  );
};

Date.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default Date;
