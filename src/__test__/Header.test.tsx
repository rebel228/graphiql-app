import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import Header from '../components/Header/Header';
import WrapperWithLocaleContext from './helpers/WrapperWithLocaleContext';
import WrapperWithStore from './helpers/WrapperWithStore';
import MemoryRouterProvider from './helpers/MemoryRouterProvider';
import { store } from '../store/store';
import { login } from '../store/slices/userSlice';
import HeaderButtons from '../components/Header/HeaderButtons';
import LangSwitcher from '../components/Header/LangSwitcher';
import HeaderBurgerButtons from '../components/Header/HeaderBurgerButtons';
import WelcomeBurgerButton from '../components/Header/WelcomeBurgerButton';
import WelcomeButton from '../components/Header/WelcomeButton';
import mediaQuery from 'css-mediaquery';
import { localesObj } from '../dto/locales';

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <Header />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('button-signin')).toBeInTheDocument();
    expect(screen.getByTestId('button-signup')).toBeInTheDocument();
  });

  it('has control that allows user to switch the language', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <Header />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const langSwitchButton = screen.getAllByTestId('lang-switch-button')[0];
    expect(langSwitchButton).toHaveTextContent(
      localesObj.ru.langSwitcher.menuTitle
    );

    fireEvent.click(langSwitchButton);

    const switchToEn = await screen.findByTestId('switch-to-en');
    const switchToRu = await screen.findByTestId('switch-to-ru');

    expect(switchToEn).toBeInTheDocument();
    expect(switchToRu).toBeInTheDocument();

    fireEvent.click(switchToEn);
    await waitFor(() => {
      expect(langSwitchButton).toHaveTextContent(
        localesObj.en.langSwitcher.menuTitle
      );
    });

    fireEvent.click(langSwitchButton);
    fireEvent.click(switchToRu);
    await waitFor(() => {
      expect(langSwitchButton).toHaveTextContent(
        localesObj.ru.langSwitcher.menuTitle
      );
    });
  });

  it('has Sign Out button - signs user out', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <Header />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('button-signin')).toBeInTheDocument();
    expect(screen.getByTestId('button-signup')).toBeInTheDocument();
    expect(screen.queryByTestId('button-logout')).not.toBeInTheDocument();

    store.dispatch(login());

    await waitFor(() => {
      expect(screen.getByTestId('button-logout')).toBeInTheDocument();
      expect(screen.queryByTestId('button-signin')).not.toBeInTheDocument();
      expect(screen.queryByTestId('button-signup')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('button-logout'));

    await waitFor(() => {
      expect(screen.getByTestId('button-signin')).toBeInTheDocument();
      expect(screen.getByTestId('button-signup')).toBeInTheDocument();
      expect(screen.queryByTestId('button-logout')).not.toBeInTheDocument();
    });

    expect(store.getState().user.isAuth).toBe(false);
  });
});

describe('HeaderBurgerButtons', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <HeaderBurgerButtons />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('header-burger-buttons')).toBeInTheDocument();
  });
});

describe('HeaderButtons', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <HeaderButtons />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('header-buttons')).toBeInTheDocument();
  });
});

describe('LangSwitcher', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <LangSwitcher />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
  });
});

describe('WelcomeBurgerButton', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <WelcomeBurgerButton />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('welcome-burger-button')).toBeInTheDocument();
  });
});

describe('WelcomeButton', () => {
  it('renders correctly', () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="ru">
          <MemoryRouterProvider initialEntries={['/']}>
            <WelcomeButton />
          </MemoryRouterProvider>
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    expect(screen.getByTestId('welcome-button')).toBeInTheDocument();
  });

  describe('Header', () => {
    it('renders correctly', async () => {
      render(
        <WrapperWithStore>
          <WrapperWithLocaleContext lang="en">
            <MemoryRouterProvider initialEntries={['/auth']} />
          </WrapperWithLocaleContext>
        </WrapperWithStore>
      );
      await waitFor(() => {
        const linkToWelcomePage = screen.getByTestId('header-logo-link');

        expect(linkToWelcomePage).toBeVisible();
        expect(linkToWelcomePage).toHaveAttribute('href', '/');

        fireEvent.click(linkToWelcomePage);

        expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
      });
    });

    it('becomes sticky when scrolling', async () => {
      render(
        <WrapperWithStore>
          <WrapperWithLocaleContext lang="en">
            <MemoryRouterProvider initialEntries={['/auth']} />
          </WrapperWithLocaleContext>
        </WrapperWithStore>
      );
      const header = await screen.findByTestId('navbar');

      fireEvent.scroll(window, { target: { scrollY: 100 } });

      await waitFor(() => {
        expect(header).toHaveClass('sticky top-0 z-10');
      });
    });
  });

  function createMatchMedia(width: number) {
    return (query: string) => {
      return {
        matches: mediaQuery.match(query, { width }),
        media: '',
        addListener: () => {},
        removeListener: () => {},
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      };
    };
  }

  function resizeScreenSize(width: number) {
    window.matchMedia = createMatchMedia(width);
  }

  describe('Media Test', () => {
    // beforeEach(async () => {
    //   render(
    //     <WrapperWithStore>
    //       <WrapperWithLocaleContext lang="en">
    //         <MemoryRouterProvider initialEntries={['/']} />
    //       </WrapperWithLocaleContext>
    //     </WrapperWithStore>
    //   );
    // });
    it('Desktop Test: burger button hidden on large screens', async () => {
      render(
        <WrapperWithStore>
          <WrapperWithLocaleContext lang="en">
            <MemoryRouterProvider initialEntries={['/auth']} />
          </WrapperWithLocaleContext>
        </WrapperWithStore>
      );
      const burgerButton = await screen.findByTestId('burger-menu-button');
      expect(burgerButton).toHaveClass('lg:invisible');
    });

    it('Mobile Test: burger button visible on small screens', async () => {
      render(
        <WrapperWithStore>
          <WrapperWithLocaleContext lang="en">
            <MemoryRouterProvider initialEntries={['/auth']} />
          </WrapperWithLocaleContext>
        </WrapperWithStore>
      );
      resizeScreenSize(400);
      const burgerButton = await screen.findByTestId('burger-menu-button');
      expect(burgerButton).toHaveClass('lg:invisible');
      expect(burgerButton).toBeVisible();
    });
  });
});

describe('Auth navigation', () => {
  it('clicking sign-up changes auth path', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const button = await screen.findByTestId('button-signup');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.getState().authPath.isLoginPath).toBe(false);
    });
  });

  it('clicking sign-in changes login path', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const button = await screen.findByTestId('button-signin');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.getState().authPath.isLoginPath).toBe(true);
    });
  });

  it('clicking sign-up changes auth path', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const button = await screen.findByTestId('button-burger-signup');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.getState().authPath.isLoginPath).toBe(false);
    });
  });

  it('clicking sign-in changes login path', async () => {
    render(
      <WrapperWithStore>
        <WrapperWithLocaleContext lang="en">
          <MemoryRouterProvider initialEntries={['/']} />
        </WrapperWithLocaleContext>
      </WrapperWithStore>
    );
    const button = await screen.findByTestId('button-burger-signin');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.getState().authPath.isLoginPath).toBe(true);
    });
  });
});
