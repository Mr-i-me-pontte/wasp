import { waitFor } from "@testing-library/react";
import { render, screen, userEvent, fireEvent } from "../../../../../tests";
import ModalForm from "../ModalForm";

describe("<ModalForm />", () => {
  it("must have 6 inputs for the validation code", async () => {
    render(<ModalForm />);
    expect(screen.getAllByRole("textbox").length).toBe(6);
  });

  it("must call the code resend function", async () => {
    const onResendCode = jest.fn();

    render(<ModalForm onResendCode={onResendCode} />);

    const btnResendCode = screen.getByRole("button", {
      name: /Enviar um novo código/i
    });

    btnResendCode.click();

    expect(btnResendCode).toBeTruthy();
    expect(onResendCode).toBeCalledTimes(1);
  });

  it("must call the confirmSignup function", async () => {
    const onSubmit = jest.fn();
    const onResendCode = jest.fn();

    render(<ModalForm onResendCode={onResendCode} onSubmit={onSubmit} />);

    const btnSubmit = screen.getByRole("button", {
      name: /Confirmar/i
    });

    const inputs = screen.getAllByRole('textbox');

    inputs.map((i) => userEvent.type(i, "1"))

    await waitFor(() => {
      return fireEvent.submit(btnSubmit)
    })

    expect(btnSubmit).toBeTruthy();
    expect(onSubmit).toBeCalledTimes(1);
  });
});
