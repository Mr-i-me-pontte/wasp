import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import { screen, render, fireEvent } from "../../../../../tests";
import Password from "../Password";

const props = {
  name: "password",
  label: "Digite sua senha: ",
};

const WrapperForm = ({ children }) => {
  const methods = useForm({ mode: "all" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<EntityPassword />", () => {
  it("must receive a valid password", async () => {
    render(
      <WrapperForm>
        <Password {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "Pontte@2#28" } }))
        )
    );

    expect(
      screen.queryByText(
        "A sua senha precisa ter no mínimo 8 caracteres, com números, letras minúsculas, maiúsculas e caracteres especiais (@ * ! % ; : .)"
      )
    ).not.toBeInTheDocument();
  });

  it("must inform incorrect password and show a error message", async () => {
    render(
      <WrapperForm>
        <Password {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "pontte" } }))
        )
    );

    expect(
      screen.getByText(
        "A sua senha precisa ter no mínimo 8 caracteres, com números, letras minúsculas, maiúsculas e caracteres especiais (@ * ! % ; : .)"
      )
    ).toBeInTheDocument();
  });
});
