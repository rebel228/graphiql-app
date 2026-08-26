import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import MemoryRouterProvider from './helpers/MemoryRouterProvider';
import About from '../components/About/About';
import { store } from '../store/store';
import { login, logout } from '../store/slices/userSlice';

describe('Welcome Page', () => {
  beforeEach(() => {
    store.dispatch(logout());
  });

  it('renders sign-in, sign-up buttons when not authenticated', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <About />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(() => {
      expect(screen.getByTestId('about-sign-in-btn')).toBeInTheDocument();
      expect(screen.getByTestId('about-sign-up-btn')).toBeInTheDocument();
      expect(screen.queryByTestId('about-main-btn')).not.toBeInTheDocument();
    });
  });

  it('renders main button when authenticated', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <About />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    store.dispatch(login());
    expect(() => {
      expect(screen.getByTestId('about-main-btn')).toBeInTheDocument();
      expect(screen.queryByTestId('about-sign-in-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('about-sign-up-btn')).not.toBeInTheDocument();
    });
  });

  it('clicking sign-in button changes auth path to login', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <About />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    fireEvent.click(screen.getByTestId('about-sign-in-btn'));
    await waitFor(() => {
      expect(store.getState().authPath.isLoginPath).toBe(true);
    });
  });

  it('clicking sign-up changes auth path', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <About />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    fireEvent.click(screen.getByTestId('about-sign-up-btn'));
    await waitFor(() => {
      expect(store.getState().authPath.isLoginPath).toBe(false);
    });
  });

  it('clicking sign-in navigates to auth page', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}></MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const signInButton = await screen.findByTestId('about-sign-in-btn');
    fireEvent.click(signInButton);
    await waitFor(() => {
      expect(screen.getByTestId('auth-page')).toBeInTheDocument();
    });
  });

  it('clicking sign-up navigates to auth page', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}></MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const signUpButton = await screen.findByTestId('about-sign-up-btn');
    fireEvent.click(signUpButton);
    await waitFor(() => {
      expect(screen.getByTestId('auth-page')).toBeInTheDocument();
    });
  });
});
