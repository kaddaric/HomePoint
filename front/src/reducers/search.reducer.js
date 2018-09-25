const initialState = [];

export function searchReducer(state = initialState, action) {

  let newState = [...state];

  switch (action.type) {

    case "INIT_DATA":
      newState = action.data;
      break;

    case "FETCH_ALL_COLLABORATORS_DATA":
      newState = action.data;
      break;
      
    case "SEARCH_COLLAB":
      newState = action.collab;
      break;

    case "FILTER_BY_SKILL":
      newState = newState.filter(collab => collab.skills.includes(action.skill));
      break;

    case "UPDATE_DURATION":
      newState = newState.map(collab => {
        const newCollab = { ...collab }
        if (newCollab.id === action.id) {
          newCollab.duration = action.duration;
        }
        return newCollab;
      });

      let date = new Date();

      // classement selon la disponibilité puis la temps de trajet
      const availables = newState
        .filter(collab => (date - new Date(collab.end_of_mission)) >= 0)
        .sort((a, b) => a.duration - b.duration);
      const soonAvailables = newState
        .filter(collab => 
          (new Date(collab.end_of_mission) - date) < 2590000000*2 
          && (new Date(collab.end_of_mission) - date) > 0)
        .sort((a, b) => a.duration - b.duration);
      const unavailables = newState
        .filter(collab => (new Date(collab.end_of_mission) - date) > 2590000000*2)
        .sort((a, b) => a.duration - b.duration);
      newState = [...availables, ...soonAvailables, ...unavailables];
      break;

    case "RESET_SEARCH":
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