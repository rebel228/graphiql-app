import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import MemoryRouterProvider from './helpers/MemoryRouterProvider';
import DocsModal from '../components/GraphiQL/DocsModal';
import { store } from '../store/store';
import { openDocs } from '../store/slices/docsSlice';
import { setEndpointUrl } from '../store/slices/endpointSlice';

describe('Docs Modal', () => {
  it('Renders the docs modal with the close button', async () => {
    store.dispatch(setEndpointUrl('https://graphql-pokemon2.vercel.app/'));
    store.dispatch(openDocs());
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <DocsModal />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await waitFor(() => {
      expect(screen.getByTestId('docs-close-btn')).toBeInTheDocument();
      expect(screen.getByTestId('docs-section')).toBeInTheDocument();
    });
  });

  it('Does not render the docs if the endpoint URL was invalid', async () => {
    store.dispatch(setEndpointUrl('https://bad.endpoint.url/'));
    store.dispatch(openDocs());
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <DocsModal />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await waitFor(() => {
      expect(screen.queryByTestId('docs-close-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('docs-section')).not.toBeInTheDocument();
    });
  });

  it('Renders only after fetching the results', async () => {
    store.dispatch(setEndpointUrl('https://slow.response/'));
    store.dispatch(openDocs());
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']}>
            <DocsModal />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.queryByTestId('docs-close-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('docs-section')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('docs-close-btn')).toBeInTheDocument();
      expect(screen.getByTestId('docs-section')).toBeInTheDocument();
    });
  });
});
