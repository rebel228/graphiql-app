import { FC, useContext } from 'react';
import { LocaleContext } from '../../components/LocaleContext/LocaleContext';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/slices/userSlice';
import ButtonThemed from '../../components/_ui/ButtonThemed/ButtonThemed';
import { Paths } from '../../dto/constants';
import { useNavigate } from 'react-router-dom';
import DeveloperCard from '../../components/Welcome/DeveloperCard';
import { Typography } from '@material-tailwind/react';
import { loginPath, regPath } from '../../store/slices/authPathSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { developers } from '../../dto/developers';

const About: FC = () => {
  const { spellingList } = useContext(LocaleContext);
  const isAuth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignIn = () => {
    dispatch(loginPath());
    navigate(Paths.AUTH);
  };
  const onSignUp = () => {
    dispatch(regPath());
    navigate(Paths.AUTH);
  };
  const onMainPage = () => {
    navigate(Paths.MAIN);
  };

  return (
    <div className="flex flex-col w-full">
      <section className="flex w-full justify-end end gap-2 p-6">
        {isAuth ? (
          <ButtonThemed onClick={onMainPage} data-testid="about-main-btn">
            {spellingList.headerButton.mainPage}
          </ButtonThemed>
        ) : (
          <>
            <ButtonThemed onClick={onSignIn} data-testid="about-sign-in-btn">
              {spellingList.headerButton.signIn}
            </ButtonThemed>
            <ButtonThemed onClick={onSignUp} data-testid="about-sign-up-btn">
              {spellingList.headerButton.signUp}
            </ButtonThemed>
          </>
        )}
      </section>
      <section className="flex flex-col items-center w-full">
        <article className="flex gap-8 w-full justify-center p-8 bg-peachFuzz-50 flex-wrap">
          {developers.map((dev) => (
            <DeveloperCard
              key={dev.id}
              name={dev.name}
              descr={spellingList.welcome[`${dev.id}Descr`]}
              avatarUrl={dev.avatarUrl}
              position={spellingList.welcome[dev.position]}
              githubName={dev.githubName}
              githubLink={dev.githubLink}
            />
          ))}
        </article>

        <article className="w-full p-6">
          <Typography variant="h3">
            {spellingList.welcome.aboutProjectTitle}
          </Typography>
          <Typography variant="paragraph" className="text-justify">
            {spellingList.welcome.aboutProject}
          </Typography>
        </article>
        <article className="w-full p-6 bg-peachFuzz-50">
          <Typography variant="h3">
            {spellingList.welcome.aboutCourseTitle}
          </Typography>
          <Typography variant="paragraph" className="text-justify">
            {spellingList.welcome.aboutCourse}
          </Typography>
        </article>
      </section>
    </div>
  );
};

export default About;
