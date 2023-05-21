import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from './Menu';

describe('Menu component', () => {
  test('renders menu with navigation links and dropdown', () => {
    render(<Menu />);

    const brandLink = screen.getByRole('link', { name: 'Files Manager' });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const filesLink = screen.getByRole('link', { name: 'Files' });
    const dropdownToggle = screen.getByRole('button', { name: 'Dropdown' });

    expect(brandLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(filesLink).toBeInTheDocument();
    expect(dropdownToggle).toBeInTheDocument();
  });

//   test('renders dropdown menu with correct items', () => {
//     render(<Menu />);

//     const dropdownToggle = screen.getByRole('button', { name: 'Dropdown' });
//     dropdownToggle.click();

//     const actionMenuItem = screen.getByRole('link', { name: 'Action' });
//     const anotherActionMenuItem = screen.getByRole('link', { name: 'Another action' });
//     const somethingMenuItem = screen.getByRole('link', { name: 'Something' });
//     const separatedLinkMenuItem = screen.getByRole('link', { name: 'Separated link' });

//     expect(actionMenuItem).toBeInTheDocument();
//     expect(anotherActionMenuItem).toBeInTheDocument();
//     expect(somethingMenuItem).toBeInTheDocument();
//     expect(separatedLinkMenuItem).toBeInTheDocument();
//   });
});
