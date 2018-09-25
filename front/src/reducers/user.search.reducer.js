const initialState = [];

export function searchUser(state = initialState, action) {
  let newState = [...state];

  switch (action.type) {

    case "RESET_USER":    
      newState = action.users;
      break;

    case "INIT_DATA_USERS":
      newState = action.data;
      break;

    case "SEARCH_USER":
      newState = action.user;
      break;

    default:
      break;
  }

  return newState;
}