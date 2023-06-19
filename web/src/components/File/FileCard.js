import React from 'react'
import { FaTimes, FaRegEdit } from 'react-icons/fa'

const FileCard = ({file, onDeleteFile, onEditFile}) => (
    <div className="file-card" key={file.id} onClick={() => onEditFile(file.id)}>
        <h3>
            {file.name}
            <span className="icons">
                <FaTimes
                style={{ color: 'red', cursor: 'pointer', marginRight: '5px' }}
                onClick={() => onDeleteFile(file.id)}
                />
                <FaRegEdit
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => onEditFile(file.id)}
                />
            </span>
        </h3>
        <p>{file.description}</p>
    </div>
);

export default FileCard
