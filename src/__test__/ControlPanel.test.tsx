import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import ControlPanel from '../components/GraphiQL/ControlPanel';
import { toast } from 'react-toastify';

vitest.mock('react-toastify', () => ({
  toast: {
    success: vitest.fn(),
    error: vitest.fn(),
  },
}));

describe('ControlPanel component', () => {
  it('renders correctly with apply button visible', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <ControlPanel />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('apply-button')).toBeInTheDocument();
    expect(screen.getByTestId('control-panel')).toBeInTheDocument();
    expect(screen.queryByTestId('change-button')).not.toBeInTheDocument();
  });

  it('button changes if valid URL was used', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <ControlPanel />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const input = screen.getByTestId('input-url');
    fireEvent.change(input, {
      target: { value: 'https://graphql-pokemon2.vercel.app/' },
    });
    fireEvent.click(screen.getByTestId('apply-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('apply-button')).not.toBeInTheDocument();
      expect(screen.getByTestId('change-button')).toBeInTheDocument();
    });
  });

  it('If a bad URL was used, the button does not change', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <ControlPanel />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const input = screen.getByTestId('input-url');
    fireEvent.change(input, {
      target: { value: 'https://bad.endpoint.url/' },
    });
    fireEvent.click(screen.getByTestId('apply-button'));

    await waitFor(() => {
      expect(screen.getByTestId('apply-button')).toBeInTheDocument();
      expect(screen.queryByTestId('change-button')).not.toBeInTheDocument();
    });
  });

  it('If a valid URL was used shows toast with success', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <ControlPanel />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const input = screen.getByTestId('input-url');
    fireEvent.change(input, {
      target: { value: 'https://graphql-pokemon2.vercel.app/' },
    });
    fireEvent.click(screen.getByTestId('apply-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('If a bad  URL was used shows toast with error', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <ControlPanel />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    fireEvent.click(screen.getByTestId('apply-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
