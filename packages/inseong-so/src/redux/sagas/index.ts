import { logEffect } from '../common/sagaLogger';

export async function runSaga(store: any, saga: any, ...args: any[]) {
  try {
    const iterator = saga(...args);
    let result = iterator.next();
    while (!result.done) {
      const effect = result.value;
      logEffect(effect);
      switch (effect.type) {
        case 'fork': {
          runSaga(store, effect.saga, ...effect.args);
          result = iterator.next();
          break;
        }
        case 'take': {
          const action = await new Promise(resolve =>
            store.actionsEmitter.once(effect.actionType, resolve),
          );
          result = iterator.next(action);
          break;
        }
        case 'select': {
          result = iterator.next(effect.selector(store.getState()));
          break;
        }
        case 'call': {
          result = iterator.next(await effect.fn(...effect.args));
          break;
        }
        case 'put': {
          store.dispatch(effect.action);
          result = iterator.next();
          break;
        }
        default:
          throw new Error(`Invalid effect type: ${effect.type}`);
      }
    }
  } catch (err) {
    console.error('Uncaught in runSaga', err);
  }
}
