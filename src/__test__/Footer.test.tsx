import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import Footer from '../components/Footer/Footer';

describe('Footer tests', () => {
  it('All github links and images are present as well as the RS School link', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <Footer />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('dima-link')).toHaveAttribute(
      'href',
      'https://github.com/rebel228'
    );
    expect(screen.getByTestId('max-link')).toHaveAttribute(
      'href',
      'https://github.com/maxsimusprime'
    );
    expect(screen.getByTestId('inga-link')).toHaveAttribute(
      'href',
      'https://github.com/IngaMuse'
    );
    expect(screen.getByTestId('rs-link')).toHaveAttribute(
      'href',
      'https://rs.school/react/'
    );

    expect(screen.getByTestId('dima-image')).toHaveAttribute('src');
    expect(screen.getByTestId('max-image')).toHaveAttribute('src');
    expect(screen.getByTestId('inga-image')).toHaveAttribute('src');
    expect(screen.getByTestId('rs-image')).toHaveAttribute('src');
  });
});
