import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaTimes } from 'react-icons/fa';
import File from './File';

describe('File component', () => {
  const mockFile = {
    id: 1,
    name: 'test-file.txt',
    description: 'This is a test file',
  };

  const mockDeleteFile = jest.fn();

  beforeEach(() => {
    render(<File file={mockFile} onDeleteFile={mockDeleteFile} />);
  });

  test('renders file name and description', () => {
    const fileNameElement = screen.getByText(mockFile.name);
    const fileDescriptionElement = screen.getByText(mockFile.description);

    expect(fileNameElement).toBeInTheDocument();
    expect(fileDescriptionElement).toBeInTheDocument();
  });

//   test('calls onDeleteFile when delete button is clicked', () => {
//     const deleteButton = screen.getByRole('button', { name: 'Delete' });

//     fireEvent.click(deleteButton);

//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//     expect(mockDeleteFile).toHaveBeenCalledWith(mockFile.id);
//   });

//   test('displays delete icon with correct styles', () => {
//     const deleteIcon = screen.getByTestId('delete-icon');

//     expect(deleteIcon).toBeInTheDocument();
//     expect(deleteIcon).toHaveStyle('color: red');
//     expect(deleteIcon).toHaveStyle('cursor: pointer');
//   });
});
