import axios from 'axios';

export const filterBySkill = (skill) => {
  return {
    type: "FILTER_BY_SKILL",
    skill,
  }
}

export const updateDuration = (id, duration) => {
  return {
    type: "UPDATE_DURATION",
    id,
    duration,
  }
}

export const searchCollab = (collab) => {
  return {
    type: "SEARCH_COLLAB",
    collab,
  }
}

export const initData = () => {
  return (dispatch) => {
    axios.get('/api')
    .then(res => {
      const data = [...res.data].map(collab => {
        return {
          ...collab,
          skills: collab.skills.split(','),
        }
      });
      dispatch({
        type: "INIT_DATA",
        data,
      })
    })
  }
}

export const fetchAllCollaboratorsData = () => {
  return (dispatch) => {
    axios.get('/api/collaborators')
    .then(res => {
      const data = [...res.data].map(collab => {
        return {
          ...collab,
          skills: collab.skills.split(','),
        }
      });
      dispatch({
        type: "FETCH_ALL_COLLABORATORS_DATA",
        data,
      })
    })
  }
}