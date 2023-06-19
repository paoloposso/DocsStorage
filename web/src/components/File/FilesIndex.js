import React from 'react'
import FilesList from './FilesList'
import { useState } from 'react';
import AddFile from './AddFile';
import { Button, Container } from 'react-bootstrap';
import ConfirmationDialog from '../Common/Dialog/ConfirmationDialog';
import CustomAlert from '../Common/Alert/CustomAlert';
import { getAllFiles, getFileById } from './FileService';

const FilesIndex = () => {
  const [files, setFiles] = useState(getAllFiles());

  const [showDialog, setShowDialog] = useState(false);
  const [operationResult, setOperationResult] = useState({type: '', text: '', show: false});

  const [showAddFile, setShowAddFile] = useState(false);
  
  const [fileToEdit, setFileToEdit] = useState(0);

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

  const editFile = (id) => {  
    setFileToEdit(id);
    setShowAddFile(true);
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
        {showAddFile && <AddFile onAddFile={addFile} onToggleShowAddFile={setShowAddFile} editFileId={fileToEdit} />}
      <br />
      <FilesList files={files} onDeleteFile={deleteFile} onEditFile={editFile} />
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
