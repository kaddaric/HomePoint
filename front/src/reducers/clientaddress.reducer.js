const initialState = "";

export const clientAddressReducer = (state = initialState, action) => {

  switch (action.type) {
    case "UPDATE_CLIENT_ADDRESS" :
      return action.clientAddress.split(/ |,/).join("+");
    case "RESET_SEARCH":
      return initialState;
    default:
      return state
  }
}