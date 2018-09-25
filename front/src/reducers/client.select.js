const initialState = [];

export function selectedClient(state = initialState, action) {
  let newState = [...state];

  switch (action.type) {

    case "CLIENT_SELECTED":
      newState = [action.client];
      break;

    case "RESET_SELECTED_CLIENT":
     newState = initialState;
     break;
      
    default:
      break;
  }

  return newState;
}