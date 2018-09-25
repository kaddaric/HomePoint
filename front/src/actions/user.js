import axios from 'axios';

export const initDataUsers = () => {
  return (dispatch) => {
    axios.get('/api/users')
    .then(res => {            
      dispatch({
        type: "INIT_DATA_USERS",
        data: res.data,
      })
    })
  }
}


export const selectUser = (user) => {
	return {
		type: "USER_SELECTED",
		user
	}
}

export const resetUser = (users) => {
  return {
    type: "RESET_USER",
    users,
  }
}

export const searchUser = (user) => {
  return {
    type: "SEARCH_USER",
    user,
  }
}
