import { FC, Suspense, lazy } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Navigate } from 'react-router-dom';
import { authSelector } from '../../store/slices/userSlice';
import { Paths } from '../../dto/constants';
import Loader from '../../components/Loader/Loader';

const Auth: FC = () => {
  const isAuth = useAppSelector(authSelector);

  const LazySignIn = lazy(() => import('../../components/Forms/SignIn'));

  if (isAuth) {
    return <Navigate to={Paths.MAIN} replace />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <section
        className="flex flex-grow items-center justify-center truncate"
        data-testid="auth-page"
      >
        <LazySignIn />
      </section>
    </Suspense>
  );
};

export default Auth;
