export const selectPeople = (collab) => {
	return {
		type: "SELECT_PEOPLE",
		collab
	}
}

export const reset = () => {
	return {
		type: "RESET"
	}
}