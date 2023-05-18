import React from 'react'
import { FaTimes } from 'react-icons/fa'

const File = ({file, onDeleteFile}) => {
  return (
    <div className="file-card" key={file.id}>
        <h3>
            {file.name}
            <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={ () => onDeleteFile(file.id) }/>
        </h3>
        <p>{file.description}</p>
    </div>
  )
}

export default File