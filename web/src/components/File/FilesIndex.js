import React from 'react'
import FilesList from './FilesList'
import { useState } from 'react';
import AddFile from './AddFile';
import { Button, Container } from 'react-bootstrap';

const FilesIndex = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'File 1', description: 'Description for File 1' },
    { id: 2, name: 'File 2', description: 'Description for File 2' },
    { id: 3, name: 'File 3', description: 'Description for File 3' },
  ]);

  const [showAddFile, setShowAddFile] = useState(false);

  const addFile = (file) => {
    const id = Math.floor(Math.random() * 100000) + 1;
    file.id = id;
    setFiles([...files, file]);
  }

  const deleteFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  }

  return (
    <Container>
      <div className="d-grid gap-2">
        {!showAddFile && <Button variant='outline-primary' onClick={() => { setShowAddFile(true) }}>Add new file</Button>}
      </div>
      {showAddFile && <AddFile onAddFile={addFile} />}
      <br />
      <FilesList files={files} onDeleteFile={deleteFile} />
    </Container>
  )
}

export default FilesIndex
