import React from 'react'
import FilesList from './FilesList'
import { useState } from 'react';

const FilesHome = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'File 1', description: 'Description for File 1' },
    { id: 2, name: 'File 2', description: 'Description for File 2' },
    { id: 3, name: 'File 3', description: 'Description for File 3' },
  ]);

  const addFile = (file) => {
    setFiles([...files, file]);
  }

  const deleteFile = (id) => {
    setFiles(files.map(f => f.id !== id));
  }

  return (
    <div>
      <FilesList files={files} onDeleteFile={deleteFile} />
    </div>
  )
}

export default FilesHome
