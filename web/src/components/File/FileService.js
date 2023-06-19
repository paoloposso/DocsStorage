const files = [
    { id: 1, name: 'File 1', description: 'Description for File 1' },
    { id: 2, name: 'File 2', description: 'Description for File 2' },
    { id: 3, name: 'File 3', description: 'Description for File 3' },
  ];

export function getAllFiles() {
  return files;
}

export function getFileById(id) {
    return files.find(f => f.id === id);
}
