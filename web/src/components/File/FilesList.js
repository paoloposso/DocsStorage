import File from "./File";
  
const FilesList = ({files, onDeleteFile}) => {
  return (
    <div>
        <h2>File List</h2>
        <div>
            {
              files.map((file) => (
                <File key={file.id} file={file} onDeleteFile={onDeleteFile}></File>
              ))
            }
        </div>                
    </div>
  );
};

export default FilesList;