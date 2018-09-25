const initialState = [];

export function clientSearchReducer(state = initialState, action) {

  let newState = [...state];

  switch (action.type) {

    case "INIT_DATA_CLIENTS":      
      newState = action.data;
      break;

    case "RESET_CLIENT":
      newState = action.clients;
      break;

    case "FILTER_CLIENT":
      newState = newState.filter(client => client.name === action.client);
      break;

    default:
      break;
  }

  return newState;
}