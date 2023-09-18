import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { ConnectForm } from "../../../Hooks/FormHooks";
import Input from "./Input";

const Search = ({
  id,
  label,
  name,
  inputClass = ["form-control"],
  defaultValue = "",
  inputClassLabel = [],
  inputClassGroup = ["grey", "mb-3", "form-field"],
  isDisabled=false,
  placeholder,
  helpInformation=""
}) => {
  inputClass.push('search')
  let icon = 'search__icon'
  
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
            cssClass="input mb-3"
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id={id}
                  role="search"
                  inputClass={inputClass}
                  label={label}
                  name={name}
                  type="search"
                  inputClassLabel={inputClassLabel}
                  inputClassGroup={inputClassGroup}
                  errors={errors}
                  disabled={isDisabled}
                  placeholder={placeholder}
                  icon={icon}
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

Search.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  wrapClass: PropTypes.array,
  inputClass: PropTypes.array,
  inputClassLabel: PropTypes.array,
  inputClassGroup: PropTypes.array,
  isDisabled: PropTypes.bool
};

export default Search;
