import { FC, useContext, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Input, Button, Typography } from '@material-tailwind/react';
import { authPathSelector, loginPath } from '../../store/slices/authPathSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { LocaleContext } from '../LocaleContext/LocaleContext';
import { object, string } from 'yup';
import { SignUpForm } from '../../dto/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { Paths } from '../../dto/constants';
import { login } from '../../store/slices/userSlice';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const SignUp: FC = () => {
  const isLoginPath = useAppSelector(authPathSelector);
  const dispatch = useAppDispatch();
  const { spellingList } = useContext(LocaleContext);
  let errorCode: string;
  const schemaReg = object({
    name: string().required(`${spellingList.forms.requiredError}`),
    email: string()
      .required(`${spellingList.forms.requiredError}`)
      .email(`${spellingList.forms.emailError}`),
    password: string()
      .required(`${spellingList.forms.requiredError}`)
      .matches(/^(?=.*[0-9])/, `${spellingList.forms.passwordErrorDigit}`)
      .matches(
        /^(?=.*[a-zA-Zа-яА-Я])/,
        `${spellingList.forms.passwordErrorLetter}`
      )
      .matches(
        /^(?=.*[!@#%&$^*()?><|+=])/,
        `${spellingList.forms.passwordErrorChar}`
      )
      .matches(
        /^[\w\Wa-zA-Z0-9!@#%&$^*()?><|+=]{8,}$/,
        `${spellingList.forms.passwordErrorCount}`
      ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpForm>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaReg),
    reValidateMode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setLoading(false);
        dispatch(login());
        setLoading(true);
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: data.name,
          })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              if (error instanceof FirebaseError) {
                errorCode = `${spellingList.forms.firebaseErrorInternal}`;
                toast.error(`${errorCode}`, { draggable: false });
              }
            });
        }
        toast.success(`${spellingList.forms.success}`, { draggable: false });
        <Navigate to={Paths.MAIN} replace />;
      })
      .catch((error) => {
        setLoading(false);
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/internal-error':
              errorCode = `${spellingList.forms.firebaseErrorInternal}`;
              break;
            case 'auth/email-already-in-use':
              errorCode = `${spellingList.forms.firebaseErrorEmail}`;
              break;
            case 'auth/network-request-failed':
              errorCode = `${spellingList.forms.firebaseErrorNetwork}`;
              break;
            case 'auth/too-many-requests':
              errorCode = `${spellingList.forms.firebaseErrorMany}`;
              break;
            default:
              errorCode = error.code;
          }
          toast.error(`${errorCode}`, { draggable: false });
        }
      });
    reset();
  };

  return loading ? (
    <Loader />
  ) : (
    <div
      className={`sign_up ease-in-out duration-1000 flex flex-col items-center relative w-640 py-12 px-8 ${
        isLoginPath ? '-translate-x-200%' : 'translate-x-0'
      }`}
    >
      <Typography variant="h4" color="blue-gray">
        {`${spellingList.headerButton.signUp}`}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {`${spellingList.forms.signUpText}`}
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {`${spellingList.forms.name}`}
          </Typography>
          <Input
            {...register('name')}
            size="lg"
            crossOrigin=""
            placeholder={spellingList.forms.namePlaceholder}
            className=" !border-gray-500 focus:!border-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            data-testid="name-signUp"
          />
          <span
            className="form__error text-red-500"
            data-testid="name-signUp-error"
          >
            {errors.name?.message ? errors.name?.message : ''}
          </span>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {`${spellingList.forms.email}`}
          </Typography>
          <Input
            {...register('email')}
            size="lg"
            crossOrigin=""
            placeholder="name@mail.com"
            className=" !border-gray-500 focus:!border-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            data-testid="email-signUp"
          />
          <span
            className="form__error text-red-500"
            data-testid="email-signUp-error"
          >
            {errors.email?.message ? errors.email?.message : ''}
          </span>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {`${spellingList.forms.password}`}
          </Typography>
          <Input
            {...register('password')}
            type="password"
            size="lg"
            crossOrigin=""
            placeholder="********"
            className=" !border-gray-500 focus:!border-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            data-testid="password-signUp"
          />
          <span
            className="form__error text-red-500"
            data-testid="password-signUp-error"
          >
            {errors.password?.message ? errors.password?.message : ''}
          </span>
        </div>
        <Button
          type="submit"
          className="mt-6 bg-peachFuzz-500 text-gray-900"
          variant="filled"
          fullWidth
          data-testid="button-signUp"
        >
          {`${spellingList.headerButton.signUp}`}
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal hidden maxmd:block"
        >
          {`${spellingList.forms.hasAccount}`}{' '}
          <span
            role="button"
            className="font-medium text-gray-900 hover:text-gray-700 cursor-pointer"
            onClick={() => dispatch(loginPath())}
          >
            {`${spellingList.headerButton.signIn}`}
          </span>
        </Typography>
      </form>
    </div>
  );
};

export default SignUp;
