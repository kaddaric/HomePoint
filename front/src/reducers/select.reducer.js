const initialState = [];

export function selectedReducer(state = initialState, action) {
	let newState = [...state];

	switch (action.type) {
		case "SELECT_PEOPLE":
			newState = [action.collab];
			break;

    case "RESET":
    case "FETCH_ALL_COLLABORATORS_DATA":
			newState = initialState;
			break;
			
		default:
			break;
	}

	return newState;
}
