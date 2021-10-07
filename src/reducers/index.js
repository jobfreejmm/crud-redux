import { combineReducers } from 'redux';
import alertaReducer from './alertaReducer';
import ProductosReducer from './productosReducer';

const reducer = combineReducers({
  productos: ProductosReducer,
  alertas: alertaReducer,
});
export default reducer;
