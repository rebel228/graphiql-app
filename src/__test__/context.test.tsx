import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import { useContext, type FC } from 'react';
import { LocaleContext } from '../components/LocaleContext/LocaleContext';

const TestComponent: FC = () => {
  const { spellingList } = useContext(LocaleContext);
  return <>{spellingList.test.text}</>;
};

describe('Context with language control', () => {
  it('support English', () => {
    render(
      <WrapperWithLocaleContext lang="en">
        <TestComponent />
      </WrapperWithLocaleContext>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('supports Russian', () => {
    render(
      <WrapperWithLocaleContext lang="ru">
        <TestComponent />
      </WrapperWithLocaleContext>
    );
    expect(screen.getByText('Тест')).toBeInTheDocument();
  });
});
