export const logEffect = (effect: any) => {
  let effectInfo;
  switch (effect.type) {
    case 'fork':
      effectInfo = effect.saga.name;
      break;
    case 'take':
      effectInfo = effect.actionType;
      break;
    case 'select':
      effectInfo = effect.selector.name;
      break;
    case 'call':
      effectInfo = effect.fn.name;
      break;
    case 'put':
      effectInfo = `${effect.action.type} ${JSON.stringify(effect.action.data)}`;
      break;
    default:
      break;
  }
  console.log(
    `%ceffect: %c${effect.type}%c ${effectInfo}`,
    'color: gray',
    'color: green; font-weight: bold',
    'color: #6f47ff; font-weight: bold',
  );
};

export const logAction = (action: any, newState: any) => {
  console.log(
    `%caction: %c${action.type}%c ${JSON.stringify(
      action.data,
      null,
      2,
    )}%c\nnew state:%c ${JSON.stringify(newState, null, 2)}`,
    'color: gray',
    'color: #0031d1; font-weight: bold',
    'color: #2ca9e8',
    'color: gray',
    'color: #2ca9e8',
  );
};
