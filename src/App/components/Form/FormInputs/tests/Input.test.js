import { FormProvider, useForm } from "react-hook-form";
import { screen, render, userEvent } from "../../../../../tests";
import TextInput from "../TextInput";

const props = {
  name: "companyName",
  label: "Razão Social",
  defaultValue: "PONTTE", 
  isDisabled: false
};

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<Input />", () => {
  it("must receive a value and change its internal text", () => {
    render(
      <WrapperForm>
        <TextInput {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");
 
    userEvent.clear(input)
    userEvent.type(input, "EMPRESA XYZ")

    expect(input.value).toBe("EMPRESA XYZ");
  });

  it("must receive the default value and use it", () => {
    render(
      <WrapperForm>
        <TextInput {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    expect(input.value).toBe(props.defaultValue);
  });

  it("must receive a value and its internal text must not be changed", () => {
    render(
      <WrapperForm>
        <TextInput {...{...props, isDisabled: true }} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");
 
    userEvent.clear(input)
    userEvent.type(input, "EMPRESA XYZ")

    expect(input.value).not.toBe("EMPRESA XYZ");
  });
});
