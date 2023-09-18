import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import { screen, render, fireEvent } from "../../../../../tests";
import Document from "../Document";

const props = {
  name: "document",
  label: "Digite seu documento: ",
  formType: "PJ"
};

const WrapperForm = ({ children }) => {
  const methods = useForm({ mode: "all" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("<Document />", () => {
  it("must receive a text and format it for a legal entity document", async () => {
    render(
      <WrapperForm>
        <Document {...props} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(
            fireEvent.change(input, { target: { value: "33296599000101" } })
          )
        )
    );

    expect(input).toHaveValue("33.296.599/0001-01");
    expect(screen.queryByText('Documento Inválido')).not.toBeInTheDocument();
  });

  it("must receive a text and format it for an individual document", async () => {
    render(
      <WrapperForm>
        <Document {...{ ...props, formType: "PF" }} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "63148782097" } }))
        )
    );

    expect(input).toHaveValue("631.487.820-97");
    expect(screen.queryByText('Documento Inválido')).not.toBeInTheDocument();
  });

  it("must receive an invalid individual document and show a message", async () => {
    render(
      <WrapperForm>
        <Document {...{ ...props, formType: "PF" }} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "55555555555" } }))
        )
    );

    expect(input).toHaveValue("555.555.555-55");
    expect(screen.getByText('Documento Inválido')).toBeInTheDocument();
  });


  it("must receive an invalid legal entity document and show a message", async () => {
    render(
      <WrapperForm>
        <Document {...{ ...props }} />
      </WrapperForm>
    );

    const input = screen.getByRole("textbox");

    await act(
      () =>
        new Promise((resolve) =>
          resolve(fireEvent.change(input, { target: { value: "55555555000155" } }))
        )
    );

    expect(input).toHaveValue("55.555.555/0001-55");
    expect(screen.getByText('Documento Inválido')).toBeInTheDocument();
  });
});
