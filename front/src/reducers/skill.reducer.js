const initialState = [];

export function skillReducer(state = initialState, action) {

  let newState = [...state];

  switch (action.type) {

    case "INIT_DATA_SKILLS":      
      newState = action.data;
      break;

    default:
      break;
  }

  return newState;
}