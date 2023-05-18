import ConfirmationDialog from "./Common/Dialog/ConfirmationDialog";
import { useState } from "react";
import { Button } from "react-bootstrap";
import CustomAlert from "./Common/Alert/CustomAlert";

const Home = () => {
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
        <div>
            <h1>Welcome to the Home Page</h1>
            <Button variant="primary" onClick={() => setShowDialog(true)}>
                Open Confirmation Dialog
            </Button>
            <ConfirmationDialog
                title={"Confirm?"}
                show={showDialog}
                message="Are you sure you want to perform this operation?"
                onConfirm={handleConfirm}
                onCancel={handleClose} />
            <CustomAlert type={operationResult.type} text={operationResult.text} isShow={operationResult.show} />
        </div>
    );
};

export default Home;
