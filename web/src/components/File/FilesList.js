import FileCard from "./FileCard";
import { Container } from "react-bootstrap";
  
const FilesList = ({files, onDeleteFile}) => {
  return (
    <Container>
        <h2>Files List</h2>
        <div>
            {
              files.map((file) => (
                <FileCard key={file.id} file={file} onDeleteFile={onDeleteFile}></FileCard>
              ))
            }
        </div>                
    </Container>
  );
};

export default FilesList;