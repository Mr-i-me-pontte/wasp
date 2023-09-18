import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import { ErrorMessage } from "@hookform/error-message";
import { Form } from "react-bootstrap";
import infoCycle from "../../../../images/info-circle-fill.svg";
import "./styles.scss";

const Input = forwardRef((props, ref) => {
  const {
    icon,
    label,
    id,
    name,
    value = "",
    disabled = false,
    type = "text",
    mask,
    maskChar,
    placeholder = "Digite",
    cssClasses = "",
    inputClass = [],
    onChange,
    register,
    setValue,
    inputClassLabel = [],
    inputClassGroup = ["input", "input-col", "form-field"],
    errors,
    helpInformation,
    domChildren,
    containerClassName = "",
    ...rest
  } = props;
  let isDisabled = "";

  if (disabled) {
    isDisabled = "disabled";
    inputClassGroup.push("disabled");
  }

  return (
    <div className={`input ${inputClassGroup.join(" ")} ${cssClasses}`}>
      {label && (
        <Form.Label
          htmlFor={id}
          className={`input-label ${inputClassLabel.join(" ")}`}
        >
          {label}
          {!!helpInformation && (
          <span
          className="help-information"
          data-toggle="tooltip"
          data-placement="top"
          title={helpInformation}
          href="#help"
        >
          <img src={infoCycle} alt="helpicon"/>
        </span>
        )}
        </Form.Label>
      )}
      <div className={containerClassName + " input-value"}>
        {icon && <i className={icon}></i>}
        <InputMask
          id={id}
          type={type}
          name={name}
          disabled={isDisabled}
          mask={mask}
          maskChar={maskChar}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass.join(" ")}
          ref={ref}
          {...rest}
        />
        {domChildren}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="invalid-feedback" style={{ display: "block" }}>
            {message}
          </p>
        )}
      />
    </div>
  );
});

Input.propTypes = {
  domChildren: PropTypes.any,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  setValue: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  cssClasses: PropTypes.string,
  hasColor: PropTypes.bool,
  wrapClass: PropTypes.array,
  register: PropTypes.func,
  inputClassLabel: PropTypes.array
};

export default Input;
