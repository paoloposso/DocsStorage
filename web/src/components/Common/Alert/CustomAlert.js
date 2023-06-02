import { Alert } from "react-bootstrap";
import { useState } from "react";

const CustomAlert = ({ text, type, isShow }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  let variant = type !== "" ? type : "primary";

  return show && isShow ? (
    <Alert show={show} key={variant} variant={variant} onClose={handleClose} dismissible>
      {text}
    </Alert>
  ) : null;
};

export default CustomAlert
