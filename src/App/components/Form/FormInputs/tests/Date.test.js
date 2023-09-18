import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import { screen, render, fireEvent } from "../../../../../tests";
import Date from "../Date";

const props = {
  name: "password",
  label: "Digite sua senha: "
};

const WrapperForm = ({ children }) => {
  const methods = useForm({ mode: "all" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<Date />", () => {
  it("must receive a valid date", async () => {
    render(
      <WrapperForm>
        <Date {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "2021-05-01" } }))
        )
    );

    expect(input.value).toEqual("2021-05-01");
  });
  
});
