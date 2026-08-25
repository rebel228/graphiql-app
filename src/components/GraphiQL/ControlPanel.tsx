import { Input } from '@material-tailwind/react';
import ButtonThemed from '../_ui/ButtonThemed/ButtonThemed';
import { useContext, useEffect, useRef, useState } from 'react';
import { LocaleContext } from '../LocaleContext/LocaleContext';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  isValidSelector,
  setEndpointUrl,
} from '../../store/slices/endpointSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useLazyCheckEndpointQuery } from '../../services/api';
import { toast } from 'react-toastify';

const ControlPanel = () => {
  const { spellingList } = useContext(LocaleContext);
  const isValid = useAppSelector(isValidSelector);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState<boolean>(true);

  const [trigger, result] = useLazyCheckEndpointQuery();

  const applyHandler = () => {
    if (inputRef.current?.value) {
      dispatch(setEndpointUrl(inputRef.current.value));
      trigger({ url: inputRef.current.value });
      setEditMode(false);
    }
  };

  const changeHandler = () => {
    if (inputRef.current?.value) {
      setEditMode(true);
    }
  };

  const [currentRequestId, setCurrentRequestId] = useState<string>('');

  useEffect(() => {
    const { isError, isSuccess, isFetching, requestId } = result;
    if (!isFetching && requestId !== currentRequestId) {
      if (isSuccess)
        toast.success(spellingList.graphiQLApiStatus.API_FETCH_SUCCESS, {
          draggable: true,
        });
      if (isError)
        toast.error(spellingList.graphiQLApiStatus.API_FETCH_ERROR, {
          draggable: false,
        });
      setCurrentRequestId(`${requestId}`);
    }
  }, [currentRequestId, result, spellingList]);

  return (
    <div
      className="flex flex-wrap sticky top-[78px] w-full p-2.5 items-center z-20 bg-white gap-3"
      data-testid="control-panel"
    >
      {!isValid || editMode ? (
        <ButtonThemed onClick={applyHandler} data-testid="apply-button">
          {spellingList.graphiQL.apply}
        </ButtonThemed>
      ) : (
        <ButtonThemed onClick={changeHandler} data-testid="change-button">
          {spellingList.graphiQL.change}
        </ButtonThemed>
      )}
      <div className="w-auto grow">
        <Input
          disabled={!editMode && isValid}
          className="px-3 disabled:rounded-lg"
          crossOrigin=""
          variant="standard"
          label="Endpoint"
          inputRef={inputRef}
          defaultValue={'https://graphql-pokemon2.vercel.app/'}
          data-testid="input-url"
        />
      </div>
    </div>
  );
};

export default ControlPanel;
