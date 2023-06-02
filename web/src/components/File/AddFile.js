import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import CustomAlert from "../Common/Alert/CustomAlert";

const AddFile = ({ onAddFile, onToggleShowAddFile }) => {
    const [operationResult, setOperationResult] = 
        useState({type: '', text: '', show: false});

    const [file, setFile] = 
        useState({ name: '', description: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFile({ name: file.name, description: file.description });
        setOperationResult({type: 'success', text: 'File added successfully', show: true});
    }

    const handleNameChange = (e) => {
        setFile({ ...file, name: e.target.value });  
    };

    const handleDescriptionChange = (e) => {
        setFile({ ...file, description: e.target.value });
    };
    
    return (
        <Container>
            <h2>Add File</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="fileName">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter file name" value={file.name} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fileDescription">
                    <Form.Label>File Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter file description" value={file.description} onChange={handleDescriptionChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="buttons">
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">Save</Button>
                        <Button variant="secondary" type="button" size="lg" onClick={() => onToggleShowAddFile(false)}>Cancel</Button>
                    </div>
                </Form.Group>
                <CustomAlert type={operationResult.type} text={operationResult.text} isShow={operationResult.show} />
            </Form>
        </Container>
    )
}

export default AddFile
