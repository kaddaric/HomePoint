const initialState = [];

export function selectedUser(state = initialState, action) {
  let newState = [...state];

  switch (action.type) {

    case "USER_SELECTED":
      newState = action.user;
      break;

    default:
      break;
  }

  return newState;
}