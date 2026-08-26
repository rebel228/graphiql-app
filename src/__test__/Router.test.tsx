import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import MemoryRouterProvider from './helpers/MemoryRouterProvider';
import { store } from '../store/store';
import { logout } from '../store/slices/userSlice';

describe('Welcome Page', () => {
  it('renders correctly', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(await screen.findByTestId('welcome-page')).toBeInTheDocument();
  });
});

describe('404 Page', () => {
  it('renders correctly', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/bad-route']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(await screen.findByTestId('not-found-page')).toBeInTheDocument();
  });
});

describe('GraphQL Page', () => {
  it('this route should be private', async () => {
    store.dispatch(logout());
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/graphiql']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(store.getState().user.isAuth).toBe(false);
    expect(await screen.findByTestId('welcome-page')).toBeInTheDocument();
  });
});
