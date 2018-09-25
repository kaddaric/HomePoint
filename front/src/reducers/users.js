
const initialState = [];

export function usersReducer(state = initialState, action) {

  let newState = [...state];

  switch (action.type) {

    case "INIT_DATA_USERS":
        newState = action.data;
        break;

    default:
        break;
}

  return newState;
}