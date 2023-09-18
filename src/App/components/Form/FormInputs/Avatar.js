/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import imageProfile from "images/undraw_profile_1.svg";
import camIcon from "images/icon-cam.svg";

import "./styles.scss";

const Avatar = ({
  name,
  label,
  inputClassGroup = ["mb-3 form-field"],
  setValue,
  defaultValue,
  readonly = false,
  classNames=["medium"]
}) => {
  const [image, setImage] = useState(defaultValue);
  const [file, setFile] = useState(null);
 
  const inputFile = useRef(null);

  const onChangeCapture = (e) => {
    const attachment = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (attachment) {
      reader.readAsDataURL(attachment);
      setFile(attachment);
    }
  };

  useEffect(() => {
    if (file) {
      setValue(name, file);
    }
  }, [file]);

  useEffect(() => {
    if (defaultValue) {
      setImage(defaultValue);
    }
  }, [defaultValue]);

  const onUploadImage = () => {
    inputFile.current.click();
  };

  const propsFormControl = {
    onChangeCapture,
    type: "file",
    accept: "image/png, image/jpeg",
    ref: inputFile,
    style: {
      visibility: "hidden"
    }
  };
  const styles = classNames.join(" ");

  return (
    <div className={"container-avatar ".concat(styles)}>
      {!!label && <label className="input-label bold form-label">{label}</label>}
      <div className="avatar">
        <img
          className="avatar-image"
          src={image || imageProfile}
          alt="avatar"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = imageProfile;
          }}
        />
        {!readonly && (
          <img
            className="avatar-upload"
            src={camIcon}
            alt="icon camera"
            onClick={onUploadImage}
          />
        )}
      </div>
      {!!name && (
        <Form.Group controlId={name} className={`${inputClassGroup.join(" ")}`}>
          <Form.Control {...propsFormControl} />
        </Form.Group>
      )}
    </div>
  );
};

export default Avatar;
