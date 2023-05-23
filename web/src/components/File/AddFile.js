import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AddFile = ({ onAddFile }) => {
    const [file, setFile] = 
        useState({ name: '', description: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFile({ name: file.name, description: file.description });

        alert(file);
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
                <Form.Group className="mb-3" controlId="fileName">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter file name" value={file.name} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fileDescription">
                    <Form.Label>File Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter file description" value={file.description} onChange={handleDescriptionChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Add</Button>
            </Form>
        </Container>
    )
}

export default AddFile
