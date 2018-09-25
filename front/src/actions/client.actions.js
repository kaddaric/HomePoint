import axios from 'axios';

export const filterClient = (client) => {
  return {
    type: "FILTER_CLIENT",
    client,
  }
}

export const resetClient = (clients) => {  
  return {
    type: "RESET_CLIENT",
    clients,
  }
}

export const selectClient = (client) => {
  return {
    type: "CLIENT_SELECTED",
    client,
  }
}

export const resetSelectedClient = () => {
  return {
    type: "RESET_SELECTED_CLIENT",
  }
}

export const initDataClients = () => {
  return (dispatch) => {
    axios.get('/api/clients')
    .then(res => {            
      dispatch({
        type: "INIT_DATA_CLIENTS",
        data: res.data,
      })
    })
  }
}