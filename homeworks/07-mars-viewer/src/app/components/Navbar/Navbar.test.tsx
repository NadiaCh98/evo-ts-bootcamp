import React from 'react';
import { fireEvent, Matcher, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Navbar } from './Navbar';
import styles from './Navbar.module.css';

const renderNavbarWithRouter = (route = '/') => {
  window.history.pushState({}, 'Mars Viewer', route);
  return render(<Navbar />, { wrapper: MemoryRouter });
};

describe('Navbar Component', () => {
  const activeClassName = styles.active;

  const getLinkElement = (link: Matcher) => {
    return screen.getByText(link);
  };

  beforeEach(() => {
    renderNavbarWithRouter();
  });

  it('asserts /sols and /fvorites links are rendered', () => {
    expect(getLinkElement(/sols/i)).toBeInTheDocument();
    expect(getLinkElement(/favorites/i)).toBeInTheDocument();
  });

  it('asserts /sols is active by default', () => {
    expect(
      getLinkElement(/sols/i).querySelector(activeClassName)
    ).toBeDefined();
    expect(
      getLinkElement(/favorites/i).querySelector(activeClassName)
    ).toBeNull();
  });

  it('assert navbar receive active class by click', () => {
    fireEvent.click(screen.getByText(/favorites/i));
    expect(
      getLinkElement(/favorites/i).querySelector(activeClassName)
    ).toBeDefined();
  });
});
