import { Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

const CustomAlert = ({text, type, isShow}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  let variant = type !== '' ? type : 'primary';

  return ( 
    <Alert show={show} key={variant} variant={variant} 
      onClose={() => setShow(false)} dismissible>
      {text}
    </Alert>
  )
}

export default CustomAlert
