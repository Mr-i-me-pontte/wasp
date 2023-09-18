import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import { screen, render, fireEvent } from "../../../../../tests";
import Email from "../Email";

const props = {
  name: "email",
  label: "Digite seu email: "
};

const WrapperForm = ({ children }) => {
  const methods = useForm({ mode: "all" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<Email />", () => {
  it("must be an email type field and receive an email", async () => {
    render(
      <WrapperForm>
        <Email {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "email");

    await act(
      async () =>
        new Promise((resolve) =>
          resolve(
            fireEvent.change(input, { target: { value: "dev@pontte.com.br" } })
          )
        )
    );

    expect(input).toHaveValue("dev@pontte.com.br");
  });

  it("must inform that the email is invalid", async () => {
    render(
      <WrapperForm>
        <Email {...props} />
      </WrapperForm>
    );

    const input = await screen.findByRole("textbox");

    expect(input).toHaveAttribute("type", "email");

    await act(
      async () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "$*:=#@#3#'" } }))
        )
    );
    

    expect(
      screen.getByText("Por favor, informe um e-mail válido!")
    ).toBeInTheDocument();
  });


  it("must have the field disabled", async () => {
    render(
      <WrapperForm>
        <Email {...{...props, isDisabled: true}} />
      </WrapperForm>
    );

    const input = await screen.findByRole("textbox");

    expect(input).toHaveAttribute("type", "email");

    expect(input).toBeDisabled()
  });
});
