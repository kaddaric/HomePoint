import { combineReducers } from 'redux';
import { collaboratorsReducer } from './people.reducer';
import { searchReducer } from './search.reducer';
import { clientAddressReducer } from './clientaddress.reducer';
import { selectedReducer } from './select.reducer';
import { usersReducer } from './users';
import { searchUser } from './user.search.reducer';
import { selectedUser } from './user.select.reducer';
import { clientReducer } from './client.reducer';
import { clientSearchReducer } from './client.search.reducer';
import { selectedClient } from './client.select';
import { skillReducer } from './skill.reducer';

const allReducers = combineReducers({
  collaborators: collaboratorsReducer,
  searchCollab: searchReducer,
	selectedCollab: selectedReducer,
	clientAddress: clientAddressReducer,
  users: usersReducer,
  searchUser: searchUser,
	activeUser: selectedUser,
  clients: clientReducer,
  searchClient: clientSearchReducer,
  selectedClient: selectedClient,
  skills: skillReducer,
});

export default allReducers;