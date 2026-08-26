import MemoryRouterProvider from './helpers/MemoryRouterProvider';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import { store } from '../store/store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

const mockUser = {
  uid: '123',
  email: 'test@domain.com',
} as User;

beforeEach(() => {
  vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);
});

describe('SignIn component', () => {
  it('renders sign-in form when user is not authenticated', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/auth']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );

    expect(await screen.findByTestId('auth-page')).toBeInTheDocument();

    const emailSignIn = screen.getByTestId('email-signIn');
    const passwordSignIn = screen.getByTestId('password-signIn');
    const buttonSignIn = screen.getByTestId('button-signIn');

    expect(emailSignIn).toBeInTheDocument();
    expect(passwordSignIn).toBeInTheDocument();
    expect(buttonSignIn).toBeInTheDocument();
  });

  it('redirects to main page when user is authenticated', async () => {
    vi.mocked(useAuthState).mockReturnValue([mockUser, false, undefined]);
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/auth']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(store.getState().user.isAuth).toBe(true);
    expect(await screen.findByTestId('graphql-page')).toBeInTheDocument();
  });
});
