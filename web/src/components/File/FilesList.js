import FileCard from "./FileCard";
import { Container } from "react-bootstrap";
import ConfirmationDialog from "../Common/Dialog/ConfirmationDialog";
import { useState } from "react";
import CustomAlert from "../Common/Alert/CustomAlert";

const FilesList = ({files, onDeleteFile}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [operationResult, setOperationResult] = useState({type: 'danger', text: 'aaa', show: false});

  const handleConfirm = () => {
      setTimeout(() => {
          setOperationResult({type: 'success', text: 'OK', show: true});
          setShowDialog(false);
      }, 1000);
  };

  const handleClose = () => {
      setOperationResult({type: 'warning', text: 'Canceled', show: true});
      setShowDialog(false);
  };

  return (
    <Container>
        <h2>Files List</h2>
        <div>
            {
              files.map((file) => (
                <FileCard key={file.id} file={file} onDeleteFile={onDeleteFile}></FileCard>
              ))
            }
        </div>
        <ConfirmationDialog
            title={"Confirm?"}
            show={showDialog}
            message="Are you sure you want to perform this operation?"
            onConfirm={handleConfirm}
            onCancel={handleClose} />
        <CustomAlert type={operationResult.type} text={operationResult.text} isShow={operationResult.show} />              
    </Container>
  );
};

export default FilesList;