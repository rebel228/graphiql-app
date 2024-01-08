import CodeEditor from './CodeEditor';
import { useContext, useEffect, useState } from 'react';
import { LocaleContext } from '../LocaleContext/LocaleContext';
import ButtonThemed from '../_ui/ButtonThemed/ButtonThemed';
import { useAppSelector } from '../../hooks/useAppSelector';
import { isValidSelector } from '../../store/slices/endpointSlice';
import {
  resultHeadersSelector,
  resultQuerySelector,
  resultUrlSelector,
  resultVariablesSelector,
} from '../../store/slices/resultSlice';
import { useGetGraphQLDataQuery } from '../../services/api';
import { toast } from 'react-toastify';
import { getGraphQLApiErrorMessage } from '../../helpers/getGraphQLApiErrorMessage';
import { openDocs } from '../../store/slices/docsSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const ResultsSection = () => {
  const { spellingList } = useContext(LocaleContext);
  const dispatch = useAppDispatch();

  const isValid = useAppSelector(isValidSelector);
  const url = useAppSelector(resultUrlSelector);
  const query = useAppSelector(resultQuerySelector);
  const variables = useAppSelector(resultVariablesSelector);
  const headers = useAppSelector(resultHeadersSelector);

  const { data, error, isError, isFetching, isSuccess, requestId } =
    useGetGraphQLDataQuery(
      {
        operationName: null,
        url,
        query,
        variables,
        headers,
      },
      { skip: !isValid || !url }
    );

  const result = error && 'data' in error ? error.data : data ? data : null;

  const [currentRequestId, setCurrentRequestId] = useState<string>('');

  useEffect(() => {
    if (!isFetching && requestId && requestId !== currentRequestId) {
      if (isSuccess)
        toast.success(spellingList.graphiQLApiStatus.API_FETCH_SUCCESS, {
          draggable: true,
        });
      if (isError) {
        toast.error(getGraphQLApiErrorMessage(spellingList, error), {
          draggable: false,
        });
      }
      setCurrentRequestId(`${requestId}`);
    }
  }, [
    currentRequestId,
    error,
    isError,
    isFetching,
    isSuccess,
    requestId,
    spellingList,
  ]);

  const handleOpenDocs = () => {
    dispatch(openDocs());
  };

  return (
    <section className="w-full md:w-1/2 md:h-full overflow-auto px-[20px] border-2 md:ml-[5px]">
      <CodeEditor
        mode="viewer"
        defaultValue={
          isValid && url && result ? JSON.stringify(result, null, 2) : ''
        }
      >
        <ButtonThemed
          onClick={handleOpenDocs}
          className="opacity-50 rounded-full p-2 hover:bg-peachFuzz"
          variant="outlined"
          disabled={isValid ? false : true}
          tooltip={{ text: spellingList.graphiQL.docs, position: 'left' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </ButtonThemed>
      </CodeEditor>
    </section>
  );
};

export default ResultsSection;
