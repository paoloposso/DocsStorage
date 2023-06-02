import FileCard from "./FileCard";

const FilesList = ({files, onDeleteFile}) => (
  <>
      <h2>Files List</h2>
      <div>
          {
            files.map((file) => (
              <FileCard key={file.id} file={file} onDeleteFile={onDeleteFile}></FileCard>
            ))
          }
      </div>
  </>
);

export default FilesList;