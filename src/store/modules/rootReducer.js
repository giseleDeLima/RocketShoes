// Combina todos os reducers da nossa aplicação
import { combineReducers } from 'redux';

// Aqui importamos todos nossos reducers
import cart from './Cart/reducer';

// Aqui exportamos todos nossos reducers
export default combineReducers({
  cart,
});
