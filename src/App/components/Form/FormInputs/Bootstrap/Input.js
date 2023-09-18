import React from "react";
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";

const Input = ({
                   label = undefined,
                   id,
                   name,
                   defaultValue = "",
                   control,
                   type = "text",
                   placeholder = "",
                   formText = "",
                   isDisabled = false,
                   error,
                   formState,
                   inputClassLabel = [],
                   inputClassGroup = ["mb-3", "form-field"],
               }) => {
    const e = formState?.errors || error;
    const errorMessage = e ? e[name]?.message : null;

    return (
        <>
            <Form.Group className={inputClassGroup.join(" ")} controlId={name || id}>
                {!!label && (
                    <Form.Label className={inputClassLabel.join(" ")}>{label}</Form.Label>
                )}
                <Controller
                    control={control}
                    name={name || id}
                    defaultValue={defaultValue}
                    render={({field: {onChange, value, ref}}) => (
                        <Form.Control
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            type={type}
                            isInvalid={!!errorMessage}
                            placeholder={placeholder}
                            disabled={isDisabled}
                            className="form-control"
                        />
                    )}
                />
                {!!formText && <Form.Text className="text-muted">{formText}</Form.Text>}
                <Form.Control.Feedback className="fs-6" type="invalid">
                    {errorMessage}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    );
};

export default Input;
