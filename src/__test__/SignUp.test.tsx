import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import SignUp from '../components/Forms/SignUp';
import { store } from '../store/store';
import MemoryRouterProvider from './helpers/MemoryRouterProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { localesObj } from '../dto/locales';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);
});

describe('SignUp component', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <SignUp />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const nameSignUp = screen.getByTestId('name-signUp');
    const emailSignUp = screen.getByTestId('email-signUp');
    const passwordSignUp = screen.getByTestId('password-signUp');
    const buttonSignUp = screen.getByTestId('button-signUp');

    expect(nameSignUp).toBeInTheDocument();
    expect(emailSignUp).toBeInTheDocument();
    expect(passwordSignUp).toBeInTheDocument();
    expect(buttonSignUp).toBeInTheDocument();
  });

  it('renders the name validation error', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <SignUp />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const nameInput = screen.getByTestId('name-signUp');
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(screen.getByTestId('button-signUp'));

    expect(await screen.findByTestId('name-signUp-error')).toHaveTextContent(
      localesObj.ru.forms.requiredError
    );
  });

  it('renders the email validation error', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <SignUp />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const emailInput = screen.getByTestId('email-signUp');
    fireEvent.change(emailInput, { target: { value: 'invalid email' } });
    fireEvent.click(screen.getByTestId('button-signUp'));

    expect(await screen.findByTestId('email-signUp-error')).toHaveTextContent(
      localesObj.ru.forms.emailError
    );
  });

  it('renders the password validation error', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <SignUp />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const passwordInput = screen.getByTestId('password-signUp');
    fireEvent.change(passwordInput, { target: { value: '123q@' } });
    fireEvent.click(screen.getByTestId('button-signUp'));

    expect(
      await screen.findByTestId('password-signUp-error')
    ).toHaveTextContent(localesObj.ru.forms.passwordErrorCount);
  });

  it('successful sign up ui communication', async () => {
    const { rerender } = render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/auth']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );

    expect(await screen.findByTestId('auth-page')).toBeInTheDocument();
    const mockUser = {
      uid: 'TestName',
      email: 'test@domain.com',
    } as User;
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    const nameSignUp = screen.getByTestId('name-signUp');
    const emailSignUp = screen.getByTestId('email-signUp');
    const passwordSignUp = screen.getByTestId('password-signUp');
    const buttonSignUp = screen.getByTestId('button-signUp');

    expect(nameSignUp).toBeInTheDocument();
    expect(emailSignUp).toBeInTheDocument();
    expect(passwordSignUp).toBeInTheDocument();
    expect(buttonSignUp).toBeInTheDocument();

    vi.mocked(useAuthState).mockReturnValue([mockUser, false, undefined]);

    rerender(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/auth']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );

    fireEvent.change(nameSignUp, { target: { value: 'TestName' } });
    fireEvent.change(emailSignUp, { target: { value: 'test@domain.com' } });
    fireEvent.change(passwordSignUp, { target: { value: '12345Qw$' } });
    fireEvent.click(buttonSignUp);

    expect(await screen.findByTestId('graphql-page')).toBeInTheDocument();
    expect(store.getState().user.isAuth).toBe(true);
  });
});
