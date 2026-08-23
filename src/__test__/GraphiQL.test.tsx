import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import GraphiQL from '../pages/GraphiQL/GraphiQL';

describe('GraphiQL component', () => {
  it('Send button gets enabled/disabled correctly', async () => {
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

    await waitFor(
      () => {
        const applyButton = screen.getByRole('button', { name: 'Применить' });
        expect(applyButton).toBeInTheDocument();
        fireEvent.click(applyButton);
        expect(
          screen
            .getByTestId('btn-send')
            .classList.contains('disabled:pointer-events-none')
        ).toBeFalsy();
      },
      {
        timeout: 5000,
        interval: 100,
      }
    );

    await waitFor(
      () => {
        const changeButton = screen.getByRole('button', { name: 'Изменить' });
        expect(changeButton).toBeInTheDocument();
        fireEvent.click(changeButton);
        expect(
          screen
            .getByTestId('btn-send')
            .classList.contains('disabled:pointer-events-none')
        ).toBeTruthy();
      },
      {
        timeout: 5000,
        interval: 100,
      }
    );
  });

  it('Secondary editor expands correct tab when clicking on variables', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByRole('tab', { name: 'Переменные' }));
      await waitFor(() => {
        expect(
          screen.getByTestId('tabpanel-variables').style.opacity === '1'
        ).toBeTruthy();
      });
    });
  });
  it('Secondary editor expands correct tab when clicking on header', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByRole('tab', { name: 'Заголовки' }));
      await waitFor(() => {
        expect(
          screen.getByTestId('tabpanel-header').style.opacity === '1'
        ).toBeTruthy();
      });
    });
  });
  it('Secondary editor collapses correctty when clicking on shevron button', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <GraphiQL />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByRole('tab', { name: 'Заголовки' }));
      fireEvent.click(screen.getByTestId('tabs-shevron-btn'));
      await waitFor(() => {
        expect(
          screen.getByTestId('tabs-body').style.height === '0px'
        ).toBeTruthy();
      });
    });
  });
});
