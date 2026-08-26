import { FC, useEffect, useState } from 'react';
import { Navbar, Collapse, IconButton } from '@material-tailwind/react';
import LangSwitcher from './LangSwitcher';
import { Link } from 'react-router-dom';
import logo from '../../assets/graphql-logo.svg';
import { Paths } from '../../dto/constants';
import HeaderButtons from './HeaderButtons';
import HeaderBurgerButtons from './HeaderBurgerButtons';
import WelcomeButton from './WelcomeButton';
import WelcomeBurgerButton from './WelcomeBurgerButton';

const Header: FC = () => {
  const [sticky, setSticky] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const genericHamburgerLine = `h-0.5 w-5 my-1 rounded-full bg-blue-gray-900 transition ease transform duration-300`;

  const handleScroll = () => {
    const windowScrollTop = window.scrollY;
    if (windowScrollTop > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="h-22 w-full flex dark:bg-blue-gray-900"
      data-testid="header"
    >
      <Navbar
        className={
          sticky
            ? 'sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-peachFuzz-200 border-transparent'
            : 'sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4  bg-peachFuzz-500 border-transparent'
        }
        onScroll={handleScroll}
        data-testid="navbar"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <Link to={Paths.WELCOME} data-testid="header-logo-link">
              <img
                className="block"
                src={logo}
                alt="logoGraphQl"
                data-testid="header-logo"
              />
            </Link>
            <WelcomeButton />
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">
              <LangSwitcher />
            </div>
            <div className="flex items-center gap-x-1">
              <HeaderButtons />
            </div>
            <IconButton
              variant="text"
              aria-label="open menu"
              ripple={false}
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:invisible"
              onClick={() => setOpenNav(!openNav)}
              data-testid="burger-menu-button"
            >
              <div
                className={`${genericHamburgerLine} ${
                  openNav
                    ? 'rotate-45 translate-y-1.5 group-hover:opacity-100'
                    : 'group-hover:opacity-100'
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  openNav ? 'opacity-0' : 'group-hover:opacity-100'
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  openNav
                    ? '-rotate-45 -translate-y-1.5 group-hover:opacity-100'
                    : 'group-hover:opacity-100'
                }`}
              />
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="flex items-center flex-col gap-1">
            <WelcomeBurgerButton />
            <HeaderBurgerButtons />
          </div>
          <div className="flex items-center gap-x-1 justify-center">
            <LangSwitcher />
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
