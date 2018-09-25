const initialState = [];

export function clientReducer(state = initialState, action) {

  let newState = [...state];

  switch (action.type) {

    case "INIT_DATA_CLIENTS":      
      newState = action.data;
      break;

    default:
      break;
  }

  return newState;
}