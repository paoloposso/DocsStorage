import React from 'react'
import FilesList from './FilesList'
import { useState } from 'react';
import AddFile from './AddFile';

const FilesIndex = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'File 1', description: 'Description for File 1' },
    { id: 2, name: 'File 2', description: 'Description for File 2' },
    { id: 3, name: 'File 3', description: 'Description for File 3' },
  ]);

  const addFile = (file) => {
    const id = Math.floor(Math.random() * 100000) + 1;
    file.id = id;
    setFiles([...files, file]);
  }

  const deleteFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  }

  return (
    <>
      <AddFile onAddFile={addFile} />
      <br />
      <FilesList files={files} onDeleteFile={deleteFile} />
    </>
  )
}

export default FilesIndex
