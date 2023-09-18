/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { curateOptions } from "../../../../helpers/utils";
import Header from "./Header";
import { triggerChangeHeaderText, triggerGetValueForm } from "./helpers";
import ListItems from "./ListItems";
import infoCycle from "../../../../../images/info-circle-fill.svg";

import "./styles.scss";

const Select = ({
  label,
  options = [],
  name,
  defaultValue,
  setValue = (_name, _) => _,
  multiSelect = false,
  textInside = false,
  isDisabled = false,
  formState,
  classNames = [],
  inputClassGroup = [],
  inputClassLabel = [],
  helpInformation = "",
  placeholder = ""
}) => {
  const [open, setOpen] = useState(false);
  const [header, setHeader] = useState();
  const [items, setItems] = useState([]);
  const [selection, setSelection] = useState([]);

  let { errors } = formState || {};

  if (!!errors) {
    if (!errors[name]) errors = {};
    else errors = { [name]: errors[name] };
  } else {
    errors = {}
  }

  const listRef = useRef(null);

  if (Object.values(errors || {})?.length > 0) {
    classNames.push("__errors");
  }

  if (isDisabled) {
    classNames.push(" disabled");
  }

  const styles = classNames.join(" ");

  const handleToogle = () => !isDisabled && setOpen(!open);

  const onClickOutSide = (e) => {
    if (listRef.current && !listRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", onClickOutSide);

  useEffect(() => {
    if (options.length > 0) {
      setItems(curateOptions(options));
    }
  }, [options]);

  useEffect(() => {
    if (isDisabled) {
      setOpen(false);
    }
  }, [isDisabled]);

  useEffect(() => {
    if (items.length > 0 && !textInside) {
      let defaultSelectedOption = items.find((op) => op.value === defaultValue)
      if (defaultSelectedOption) {
        setSelection([defaultSelectedOption]);
      }   
    }
  }, [defaultValue, items]);

  useEffect(() => {
    triggerGetValueForm({
      selection,
      multiSelect,
      name,
      cb: setValue
    });
  }, [selection]);

  useEffect(() => {
    triggerChangeHeaderText({
      selection,
      label,
      multiSelect,
      textInside,
      placeholder,
      cb: setHeader
    });
  }, [selection]);

  const props = {
    header: {
      handleToogle,
      header,
      multiSelect,
      selection,
      open
    },
    list: {
      handleToogle,
      options: items,
      selection,
      multiSelect,
      setSelection,
      disabled: isDisabled
    }
  };

  return (
    <div
      className={`input ${inputClassGroup.join(" ")} mb-3 container-select container-select `.concat(styles)}
      ref={listRef}
    >
      {!textInside && (
        <label htmlFor={name} className={`select-label input-label ${inputClassLabel.join(" ")}`}>
          {label}
          {!!helpInformation && (
            <span
              className="help-information"
              data-toggle="tooltip"
              data-placement="top"
              title={helpInformation}
              href="#help"
            >
              <img src={infoCycle} alt="helpicon" />
            </span>
          )}
        </label>
      )}
      <div className={"select-wrapper select-wrapper"}>
        <Header {...props.header} />
        {open && <ListItems {...props.list} />}
      </div>
      <div>
        <span className="invalid-feedback" style={{ display: "block" }}>
          {Object.values(errors || {}).map((e) => e.message)[0]}
        </span>
      </div>
    </div>
  );
};

export default Select;
