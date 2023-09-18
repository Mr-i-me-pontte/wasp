import { useForm } from "react-hook-form";
import InputMask from "../../Form/FormInputs/Bootstrap/InputMask";
import { Button, Form } from "react-bootstrap";
import LoadingIndicator from "../../LoadingIndicator";
import { useCallback, useState } from "react";
import "./style.scss";

const ModalForm = ({ onSubmit, onResendCode }) => {
  const [isValidCode, setIsValidCode] = useState(false);

  const validateCode = useCallback((values) => {
    const isEmptyString = (str) => !str || str === "" || str === "_"; 
    
    const emptyValues = Object.values(values).filter((value) =>
      isEmptyString(value)
    );

    if (emptyValues.length === 0) setIsValidCode(true);
    else setIsValidCode(false);

    return {
      values,
      errors: {}
    };
  }, []);

  const { handleSubmit, control, formState } = useForm({
    mode: "all",
    resolver: validateCode,
    defaultValues: {
      digit001: "",
      digit002: "",
      digit003: "",
      digit004: "",
      digit005: "",
      digit006: ""
    }
  });

  const handleOnSubmit = handleSubmit(onSubmit);

  const errors = {};

  return (
    <>
      {formState.isSubmitting && <LoadingIndicator isFull={true} />}
      <Form className="form-validation-code" onSubmit={handleOnSubmit}>
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
        <div className="buttons-validation-code">
          <Button variant="primary" onClick={() => onResendCode()}>
            <span style={{ color: "white" }}> Enviar um novo código</span>
          </Button>
          <Button type="onsubmit" variant="primary" disabled={!isValidCode}>
            <span style={{ color: "white" }}> Confirmar </span>
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ModalForm;
