import React from 'react'
import FilesList from './FilesList'
import { useState } from 'react';
import AddFile from './AddFile';
import { Button, Container } from 'react-bootstrap';
import ConfirmationDialog from '../Common/Dialog/ConfirmationDialog';
import CustomAlert from '../Common/Alert/CustomAlert';

const FilesIndex = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'File 1', description: 'Description for File 1' },
    { id: 2, name: 'File 2', description: 'Description for File 2' },
    { id: 3, name: 'File 3', description: 'Description for File 3' },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [operationResult, setOperationResult] = useState({type: 'danger', text: 'aaa', show: false});

  const [showAddFile, setShowAddFile] = useState(false);

  const addFile = (file) => {
    const id = Math.floor(Math.random() * 100000) + 1;
    file.id = id;
    setFiles([...files, file]);
  }

  const [fileToDelete, setFileToDelete] = useState(null);

  const deleteFile = (id) => {
    setShowDialog(true);
    setFileToDelete(id);
  }

  const handleConfirmDelete = () => {
    setTimeout(() => {
      setFiles(files.filter(f => f.id !== fileToDelete));
    }, 200);

    setOperationResult({type: 'success', text: 'File deleted', show: true});
    setShowDialog(false);
  };

  const handleCloseDelete = () => {
      setOperationResult({type: 'warning', text: 'Canceled', show: true});
      setShowDialog(false);
  };

  return (
    <Container>
      <div className="d-grid gap-2">
        {!showAddFile && <Button variant='outline-primary' onClick={() => { setShowAddFile(true) }}>Add new file</Button>}
      </div>
      {showAddFile && <AddFile onAddFile={addFile} onToggleShowAddFile={setShowAddFile} />}
      <br />
      <FilesList files={files} onDeleteFile={deleteFile} />
      <ConfirmationDialog
            title={"Confirm?"}
            show={showDialog}
            message="Are you sure you want to perform this operation?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDelete} />
      <CustomAlert type={operationResult.type} text={operationResult.text} isShow={operationResult.show} />              
    </Container>
  )
}

export default FilesIndex
