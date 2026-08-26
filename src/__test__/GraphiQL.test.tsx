import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import GraphiQL from '../pages/GraphiQL/GraphiQL';

describe('GraphiQL component', () => {
  it('Renders GraphiQL component correctly', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );

    await waitFor(() => {
      expect(screen.getByTestId('graphql-page')).toBeInTheDocument();
    });
  });
});

describe('Send button tests', () => {
  it('Send button gets enabled/disabled correctly', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );

    await screen.findByTestId('control-panel');

    const applyButton = screen.getByTestId('apply-button');

    await waitFor(() => {
      expect(applyButton).toBeInTheDocument();
    });

    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(screen.getByTestId('send-button')).not.toBeDisabled();
    });

    const changeButton = await screen.findByTestId('change-button');

    await waitFor(() => {
      expect(changeButton).toBeInTheDocument();
    });

    fireEvent.click(changeButton);

    await waitFor(() => {
      expect(screen.getByTestId('send-button')).toBeDisabled();
    });
  });
});

describe('Secondary editor tests', () => {
  it('Secondary editor expands correct tabs when clicking on variables/headers', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await screen.findByTestId('control-panel');
    const variablesTab = await screen.findByTestId('variables-tab');
    const headerTab = await screen.findByTestId('header-tab');

    fireEvent.click(variablesTab);
    const tabPanelVariables = await screen.findByTestId('tabpanel-variables');
    const tabPanelHeader = await screen.findByTestId('tabpanel-header');

    await waitFor(() => {
      expect(tabPanelVariables.style.opacity).toBe('1');
      expect(tabPanelHeader.style.opacity).toBe('0');
    });

    fireEvent.click(headerTab);

    await waitFor(() => {
      expect(tabPanelVariables.style.opacity).toBe('0');
      expect(tabPanelHeader.style.opacity).toBe('1');
    });
  });

  it('Secondary editor opens and collapses correctty when clicking on shevron button', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await screen.findByTestId('graphql-page');

    const shevronButton = screen.getByTestId('tabs-shevron-btn');
    const accordion = screen.getByTestId('accordion');

    expect(accordion).toHaveAttribute('data-open', 'false');

    fireEvent.click(shevronButton);
    await waitFor(() => {
      expect(accordion).toHaveAttribute('data-open', 'true');
    });

    fireEvent.click(shevronButton);
    await waitFor(() => {
      expect(accordion).toHaveAttribute('data-open', 'false');
    });
  });

  it('Chevron icon rotates when accordion opens/closes', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await screen.findByTestId('graphql-page');

    const shevronButton = screen.getByTestId('tabs-shevron-btn');

    expect(shevronButton).not.toHaveClass('rotate-180');

    fireEvent.click(shevronButton);
    await waitFor(() => {
      expect(shevronButton).toHaveClass('rotate-180');
    });

    fireEvent.click(shevronButton);
    await waitFor(() => {
      expect(shevronButton).not.toHaveClass('rotate-180');
    });
  });
});
