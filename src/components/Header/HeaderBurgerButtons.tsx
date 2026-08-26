import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector, logout } from '../../store/slices/userSlice';
import { LocaleContext } from '../LocaleContext/LocaleContext';
import { Paths } from '../../dto/constants';
import { loginPath, regPath } from '../../store/slices/authPathSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import ButtonHeaderBurger from '../_ui/ButtonHeader/ButtonHeaderBurger';

const HeaderBurgerButtons: FC = () => {
  let buttons: React.ReactElement;
  const isAuth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const { spellingList } = useContext(LocaleContext);
  const navigate = useNavigate();
  const isWelcomePage = location.pathname === Paths.WELCOME;

  const onLogout = () => {
    dispatch(logout());
    signOut(auth);
  };
  const onSignIn = () => {
    dispatch(loginPath());
    navigate(Paths.AUTH);
  };
  const onSignUp = () => {
    dispatch(regPath());
    navigate(Paths.AUTH);
  };

  if (isAuth) {
    buttons = (
      <>
        {isWelcomePage && (
          <ButtonHeaderBurger onClick={() => navigate(Paths.MAIN)}>
            {`${spellingList.headerButton.mainPage} `}
          </ButtonHeaderBurger>
        )}
        <ButtonHeaderBurger onClick={onLogout}>
          {`${spellingList.headerButton.logOut} `}
        </ButtonHeaderBurger>
      </>
    );
  } else {
    buttons = (
      <>
        <ButtonHeaderBurger
          onClick={onSignIn}
          data-testid="button-burger-signin"
        >
          {`${spellingList.headerButton.signIn} `}
        </ButtonHeaderBurger>
        <ButtonHeaderBurger
          onClick={onSignUp}
          data-testid="button-burger-signup"
        >
          {`${spellingList.headerButton.signUp} `}
        </ButtonHeaderBurger>
      </>
    );
  }

  return (
    <nav
      data-testid="header-burger-buttons"
      className="flex flex-col items-center gap-1"
    >
      {buttons}
    </nav>
  );
};

export default HeaderBurgerButtons;
