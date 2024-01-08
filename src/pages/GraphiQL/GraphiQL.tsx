import { FC, Suspense, lazy, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import DocsModal from '../../components/GraphiQL/DocsModal';
import { useAppSelector } from '../../hooks/useAppSelector';
import { docsShown } from '../../store/slices/docsSlice';
import { resetResult } from '../../store/slices/resultSlice';
import { setEndpointState } from '../../store/slices/endpointSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const GraphiQL: FC = () => {
  const isDocsShown = useAppSelector(docsShown);
  const dispatch = useAppDispatch();

  const LazyControlPanel = lazy(
    () => import('../../components/GraphiQL/ControlPanel')
  );
  const LazyEditorsSection = lazy(
    () => import('../../components/GraphiQL/EditorsSection')
  );
  const LazyResultsSection = lazy(
    () => import('../../components/GraphiQL/ResultsSection')
  );

  useEffect(() => {
    return () => {
      dispatch(resetResult());
      dispatch(setEndpointState({ url: '', isValid: false, isLoading: false }));
    };
  });

  return (
    <Suspense fallback={<Loader />}>
      <section
        className="flex flex-col w-full h-full md:max-h-[calc(100vh-149.6px)]"
        data-testid="graphql-page"
      >
        <LazyControlPanel />
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center w-full md:h-[calc(100%-60px)] md:overflow-auto p-2 pt-0">
          <LazyEditorsSection />
          <LazyResultsSection />
        </div>
      </section>
      {isDocsShown && <DocsModal />}
    </Suspense>
  );
};

export default GraphiQL;
