import axios from 'axios';

export const initDataSkills = () => {
  return (dispatch) => {
    axios.get('/api/skills')
      .then(res => {
        dispatch({
          type: "INIT_DATA_SKILLS",
          data: res.data,
        })
      })
  }
}