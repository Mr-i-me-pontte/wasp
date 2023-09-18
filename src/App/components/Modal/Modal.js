import { Modal as ReactModal } from "react-bootstrap"
import './style.scss'

const Modal = ({title, body, show, onHide, size, ariaLabelledby, centered, className, closeButton = false }) => {
  console.log(className)
  return (
  <ReactModal show={show} onHide={onHide} size={size} aria-labelledby={ariaLabelledby} centered={centered} className={"Modal " + className}>
    <ReactModal.Header closeButton={closeButton} className="Modal__header">
      <ReactModal.Title className="Modal__title">
        {title}
      </ReactModal.Title>
    </ReactModal.Header>
    <ReactModal.Body className="Modal__body">
      {body}
    </ReactModal.Body>
  </ReactModal>
  )
}

export default Modal;