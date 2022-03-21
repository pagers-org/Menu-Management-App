export const take = (actionType: any) => ({ type: 'take', actionType });
export const select = (selector: any) => ({ type: 'select', selector });
export const call = (fn: any, ...args: any[]) => ({ type: 'call', fn, args });
export const put = (action: any) => ({ type: 'put', action });
export const fork = (saga: any, ...args: any[]) => ({ type: 'fork', saga, args });

export function* takeEvery(actionType: any, saga: any) {
  yield fork(function* newSaga() {
    while (true) {
      const action: Generator<undefined, undefined, undefined> = yield take(actionType);
      yield* saga(action)();
    }
  });
}
