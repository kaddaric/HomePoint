// import collaborators from '../data/collaborators.json';

const initialState = [];

export function collaboratorsReducer(state = initialState, action) {

  let newState = [...state];

  switch (action.type) {

    case "INIT_DATA":
      newState = action.data;
      break;
    
    case "FETCH_ALL_COLLABORATORS_DATA":
      newState = action.data;
      break;

    case "ERROR":
      console.log(action.err);
      break;

    default:
      break;
  }

  return newState;
}