import FileCard from "./FileCard";

const FilesList = ({files, onDeleteFile, onEditFile}) => (
  <>
      <h2>Files List</h2>
      <div>
          {
            files.map((file) => (
              <FileCard key={file.id} file={file} onDeleteFile={onDeleteFile} onEditFile={onEditFile}></FileCard>
            ))
          }
      </div>
  </>
);

export default FilesList;