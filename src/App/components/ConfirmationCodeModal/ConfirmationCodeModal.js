/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from '../Modal'
import ModalForm from "./ModalForm";
import { confirmSignup, resendCode } from "../Auth/helpers";
import { useAuth } from "../Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ConfirmationCodeModal = (props) => {
  const { userInviteId, email } = props;
  const { willResendCode, showModal, onHideModal, toast } = props;

  const auth = useAuth();
  const navigate = useNavigate();

  const handleResendCode = () => {
    resendCode({ auth, email, toast });
  };

  const handleConfirmSignup = async (values) => {
    const code = Object.values(values).join("");

    await confirmSignup({ auth, code, email, toast, userInviteId });

    navigate("/login", { replace: true });

    onHideModal();
  };

  useEffect(() => {
    if (willResendCode) {
      handleResendCode();
    }
  }, [willResendCode]);

  return (
    <Modal
      show={showModal}
      onHide={() => {}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-validation-code"
      title={ <h1 className="L-title">Digite seu código de verificação</h1> }
      body={ 
      <>
        <p>
          Para sua segurança, queremos confirmar se realmente é você quem fez
          o cadastro. Enviamos um código de verificação de seis dígitos para o
          seu e-mail cadastrado.
        </p>
        <ModalForm
          onSubmit={handleConfirmSignup}
          onResendCode={handleResendCode}
        />
      </>}
    />
  );
  
};

export default ConfirmationCodeModal;
