import { FC, Suspense, useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { closeDocs, docsShown } from '../../store/slices/docsSlice';
import { prettify } from '../../helpers/prettify';
import CodeEditor from './CodeEditor';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import ButtonThemed from '../_ui/ButtonThemed/ButtonThemed';
import { LocaleContext } from '../LocaleContext/LocaleContext';
import { urlSelector } from '../../store/slices/endpointSlice';
import { useLazyGetSchemaQuery } from '../../services/api';
import { toast } from 'react-toastify';

const DocsModal: FC = () => {
  const url = useAppSelector(urlSelector);
  const isDocsShown = useAppSelector(docsShown);
  const [trigger, result] = useLazyGetSchemaQuery();
  const { data, isSuccess, isFetching } = result;
  const dispatch = useAppDispatch();
  const { spellingList } = useContext(LocaleContext);
  const [currentRequestId, setCurrentRequestId] = useState<string>('');
  const genericHamburgerLine = `h-0.5 w-5 my-1 rounded-full bg-blue-gray-900 transition ease transform duration-300`;

  const handleCloseDocs = () => {
    dispatch(closeDocs());
  };
  useEffect(() => {
    const { isError, isSuccess, requestId, isFetching } = result;
    if (!isFetching && requestId !== currentRequestId) {
      if (isDocsShown && !isSuccess && !isError) trigger({ url });
      if (isSuccess)
        toast.success(spellingList.graphiQLApiStatus.API_FETCH_SUCCESS, {
          draggable: true,
        });
      if (isError) {
        dispatch(closeDocs());
        toast.error(spellingList.graphiQLApiStatus.API_FETCH_ERROR, {
          draggable: false,
        });
      }

      setCurrentRequestId(`${requestId}`);
    }
  }, [
    result,
    spellingList,
    trigger,
    url,
    currentRequestId,
    isDocsShown,
    dispatch,
  ]);

  return (
    <Suspense>
      {isDocsShown && isSuccess && !isFetching && (
        <>
          <div
            className="absolute top-0 bg-black opacity-20 cursor-pointer w-full h-full max-h-full md:max-h-[calc(100vh-117.6px)] lg:max-h-[calc(100vh-149.6px)] z-20"
            onClick={handleCloseDocs}
          />
          <section
            className="absolute top-6 flex border-4 border-white rounded-lg absolute z-30 w-[85%] overflow-auto max-h-[calc(100%-50px)] min-h-[50px] bg-white"
            data-testid="docs-section"
          >
            <CodeEditor
              mode="docs"
              defaultValue={prettify(JSON.stringify(data))}
            >
              <ButtonThemed
                className="opacity-50 rounded-full p-2 hover:bg-peachFuzz"
                variant="outlined"
                tooltip={{
                  text: spellingList.graphiQL.close,
                  position: 'left',
                }}
                data-testid="docs-close-btn"
                onClick={handleCloseDocs}
                zindex="z-20"
              >
                <div
                  className={`${genericHamburgerLine} ${'rotate-45 translate-y-1.5 group-hover:opacity-100'}`}
                />
                <div className={`${genericHamburgerLine} ${'opacity-0'}`} />
                <div
                  className={`${genericHamburgerLine} ${'-rotate-45 -translate-y-1.5 group-hover:opacity-100'}`}
                />
              </ButtonThemed>
            </CodeEditor>
          </section>
        </>
      )}
    </Suspense>
  );
};

export default DocsModal;
