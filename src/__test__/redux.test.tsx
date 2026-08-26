import authPathSlice, {
  loginPath,
  regPath,
  authPathSelector,
} from '../store/slices/authPathSlice';
import userSlice, {
  login,
  logout,
  authSelector,
} from '../store/slices/userSlice';
import resultSlice, {
  changeResult,
  resetResult,
  resultHeadersSelector,
  resultQuerySelector,
  resultUrlSelector,
  resultVariablesSelector,
} from '../store/slices/resultSlice';
import endpointSlice, {
  setEndpointUrl,
  setIsLoading,
  setIsValid,
  setEndpointState,
  isLoadingSelector,
  isValidSelector,
  urlSelector,
} from '../store/slices/endpointSlice';
import { store } from '../store/store';
import docsSlice, {
  closeDocs,
  docsShown,
  openDocs,
} from '../store/slices/docsSlice';

describe('Actions creators', () => {
  it('authPathSlice action creator returns valid action object', () => {
    expect(loginPath()).toMatchObject({
      type: 'authPath/loginPath',
      payload: undefined,
    });
    expect(regPath()).toMatchObject({
      type: 'authPath/regPath',
      payload: undefined,
    });
  });

  it('userSlice action creator returns valid action object', () => {
    expect(login()).toMatchObject({
      type: 'user/login',
      payload: undefined,
    });
    expect(logout()).toMatchObject({
      type: 'user/logout',
      payload: undefined,
    });
  });

  it('resultSlice action creator returns valid action object', () => {
    const payload = {
      url: 'url',
      query: 'query',
      variables: { a: '1' },
      headers: { b: '2' },
    };
    expect(changeResult(payload)).toMatchObject({
      type: 'result/changeResult',
      payload,
    });
    expect(resetResult()).toMatchObject({
      type: 'result/resetResult',
      payload: undefined,
    });
  });

  it('endpointSlice action creator returns valid action object', () => {
    expect(setEndpointUrl('url')).toMatchObject({
      type: 'endpoint/setEndpointUrl',
      payload: 'url',
    });
    expect(setIsLoading(true)).toMatchObject({
      type: 'endpoint/setIsLoading',
      payload: true,
    });
    expect(setIsValid(true)).toMatchObject({
      type: 'endpoint/setIsValid',
      payload: true,
    });
    expect(
      setEndpointState({
        url: 'url',
        isValid: false,
        isLoading: false,
      })
    ).toMatchObject({
      type: 'endpoint/setEndpointState',
      payload: {
        url: 'url',
        isValid: false,
        isLoading: false,
      },
    });
  });
});

describe('Reducers', () => {
  it('authPathSlice reducer returns new state', () => {
    expect(
      authPathSlice.reducer({ isLoginPath: false }, loginPath())
    ).toMatchObject({
      isLoginPath: true,
    });
    expect(
      authPathSlice.reducer({ isLoginPath: true }, regPath())
    ).toMatchObject({
      isLoginPath: false,
    });
  });

  it('userSlice reducer returns new state', () => {
    expect(userSlice.reducer({ isAuth: false }, login())).toMatchObject({
      isAuth: true,
    });
    expect(userSlice.reducer({ isAuth: true }, logout())).toMatchObject({
      isAuth: false,
    });
  });

  it('resultSlice reducer returns new state', () => {
    const initialState = { url: '', query: '', variables: {}, headers: {} };
    const payload = {
      url: 'url',
      query: 'query',
      variables: { a: '1' },
      headers: { b: '2' },
    };
    expect(
      resultSlice.reducer(initialState, changeResult(payload))
    ).toMatchObject(payload);
    expect(resultSlice.reducer(initialState, resetResult())).toMatchObject(
      initialState
    );
  });

  it('endpointSlice reducer returns new state', () => {
    const initialState = {
      url: '',
      isValid: false,
      isLoading: false,
    };
    const payload = {
      url: 'url',
      isValid: true,
      isLoading: true,
    };
    expect(
      endpointSlice.reducer(initialState, setEndpointUrl('url'))
    ).toMatchObject({
      url: 'url',
      isValid: false,
      isLoading: false,
    });
    expect(
      endpointSlice.reducer(initialState, setIsLoading(true))
    ).toMatchObject({
      url: '',
      isValid: false,
      isLoading: true,
    });
    expect(endpointSlice.reducer(initialState, setIsValid(true))).toMatchObject(
      {
        url: '',
        isValid: true,
        isLoading: false,
      }
    );
    expect(
      endpointSlice.reducer(initialState, setEndpointState(payload))
    ).toMatchObject(payload);
  });

  it('docsSlice reducer returns new state', () => {
    expect(docsSlice.reducer({ open: false }, openDocs())).toMatchObject({
      open: true,
    });
    expect(docsSlice.reducer({ open: true }, closeDocs())).toMatchObject({
      open: false,
    });
  });
});

describe('Selectors', () => {
  const state = store.getState();

  it('authPathSlice returns correct selectors', () => {
    expect(authPathSelector(state)).toBe(true);
  });

  it('userSlice returns correct selectors', () => {
    expect(authSelector(state)).toBe(false);
  });

  it('resultSlice returns correct selectors', () => {
    expect(resultUrlSelector(state)).toBe('');
    expect(resultQuerySelector(state)).toBe('');
    expect(resultVariablesSelector(state)).toEqual({});
    expect(resultHeadersSelector(state)).toEqual({});
  });

  it('endpointSlice returns correct selectors', () => {
    expect(urlSelector(state)).toBe('');
    expect(isValidSelector(state)).toBe(false);
    expect(isLoadingSelector(state)).toBe(false);
  });

  it('docsSlice returns correct selectors', () => {
    expect(docsShown(state)).toBe(false);
  });
});
