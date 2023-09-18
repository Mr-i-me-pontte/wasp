import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks/FormHooks";
import Input from "./Input";
import InputMask from "./Bootstrap/InputMask";
import "./styles.scss"


const InputCode = ({
  id,
  label,
  name = "code",
  inputClass = ["form-control"],
  inputClassLabel = [],
  inputClassGroup = ["mb-3", "form-field"],
  isDisabled=false
}) => (
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
            <div className="form-validation-code">
              <div className="fields-validation-code">
                <InputMask
                  className="input-validation-code"
                  error={errors}
                  control={control}
                  name={"digit001"}
                  mask={"9"}
                />

                <InputMask
                  className="input-validation-code"
                  error={errors}
                  control={control}
                  name={"digit002"}
                  mask={"9"}
                />

                <InputMask
                  className="input-validation-code"
                  error={errors}
                  control={control}
                  name={"digit003"}
                  mask={"9"}
                />

                <InputMask
                  className="input-validation-code"
                  error={errors}
                  control={control}
                  name={"digit004"}
                  mask={"9"}
                />

                <InputMask
                  className="input-validation-code"
                  error={errors}
                  control={control}
                  name={"digit005"}
                  mask={"9"}
                />

                <InputMask
                  className="input-validation-code"
                  error={errors}
                  control={control}
                  name={"digit006"}
                  mask={"9"}
                />
              </div>
            </div>
          )}
        />
      </>
    )}
  </ConnectForm>
);

InputCode.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default InputCode;
