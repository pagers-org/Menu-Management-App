import { call, put } from './sagaActions';

export const createRequestActionType = (action: string) => {
  const ACTION = action.toUpperCase();
  return [ACTION, `${ACTION}_SUCCESS`, `${ACTION}_FAILURE`];
};

export const createRequestSaga = (type: string, request: any, action: any) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* () {
    try {
      const response: Generator<undefined, undefined, undefined> = yield call(request, action);
      yield put({
        ...action,
        ...response,
        type: SUCCESS,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        error,
        isError: true,
      });
    }
  };
};
