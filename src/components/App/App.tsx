import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LocaleContext } from '../LocaleContext/LocaleContext';
import { Lang, Locales, SpellingList } from '../../dto/types';
import { localesObj } from '../../dto/locales';
import { auth } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login, logout } from '../../store/slices/userSlice';
import Loader from '../Loader/Loader';

const App: FC = () => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const initialLang = (localStorage.getItem('lang') || 'en') as Lang;
  const [lang, setLang] = useState<Lang>(initialLang);
  const [locales] = useState<Locales>(localesObj);
  const [spellingList, setSpellingList] = useState<SpellingList>(
    localesObj[initialLang]
  );

  useEffect(() => {
    if (user) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
    setSpellingList(localesObj[lang]);
  }, [dispatch, user, lang]);

  if (loading) return <Loader />;

  return (
    <LocaleContext.Provider value={{ locales, lang, setLang, spellingList }}>
      <Outlet />
    </LocaleContext.Provider>
  );
};

export default App;
