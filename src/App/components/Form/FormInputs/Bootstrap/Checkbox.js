/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Controller } from "react-hook-form";

const Checkbox = ({
  label = "2",
  name = "group1",
  options = [],
  disabled = false,
  inline = true,
  setValue,
}) => {
  const [listOptions, setListOptions] = useState(options);

  const handleMultiSelect = (checked, value) =>
    setListOptions((opts) =>
      opts.map((option) =>
        option.value === value ? { ...option, checked } : option
      )
    );

  useEffect(() => {
    setValue(
      name,
      listOptions.filter((op) => op.checked === true).map((list) => list.value)
    );
  }, [listOptions]);

  return (
    <>
      <Form.Group className="input mb-3" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Controller
          name={name}
          render={({ field: { ref } }) =>
            options.map(({ value, label }, index) => (
              <div
                key={`inline-${name}-${"checkbox"}-${index}`}
                className="mb-3"
              >
                <FormCheck
                  {...{
                    onChange: (e) => handleMultiSelect(e.target.checked, value),
                    ref,
                    inline,
                    label: label,
                    value: value,
                    name,
                    type: "checkbox",
                    id: `inline-${name}-${"checkbox"}-${index}`,
                    disabled
                  }}
                />
              </div>
            ))
          }
        ></Controller>
      </Form.Group>
    </>
  );
};

export default Checkbox;
