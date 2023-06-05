import React from 'react'
import { FaTimes } from 'react-icons/fa'

const FileCard = ({file, onDeleteFile, onEditFile}) => (
    <div className="file-card" key={file.id} onClick={() => onEditFile(file.id)}>
        <h3>
            {file.name}
            <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={ () => onDeleteFile(file.id) }/>
        </h3>
        <p>{file.description}</p>
    </div>
);

export default FileCard
