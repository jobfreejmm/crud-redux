/* eslint-disable no-console */
// cada reducer tiene su propio state

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_CORRECTO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGAR_PRODUCTOS,
  DESCARGAR_PRODUCTOS_ERROR,
  DESCARGAR_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_EDITAR_CORRECTO,
  PRODUCTO_EDITAR_ERROR,
  PRODUCTO_ELIMINADO_CORRECTO,
  PRODUCTO_ELIMINADO_ERROR,
  TEST,
} from '../types';

const initialState = {
  productos: [],
  error: false,
  loading: false,
  test: null,
  productoEliminado: null,
  productoEditado: null,
};

const ProductosReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_PRODUCTO_CORRECTO:
      console.log(action);
      return {
        ...state,
        productos: [...state.productos, action.payload],
        loading: false,
      };
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COMENZAR_DESCARGAR_PRODUCTOS:
      return {
        ...state,
        loading: action.payload,
      };
    case DESCARGAR_PRODUCTOS_EXITO:
      return {
        ...state,
        productos: action.payload,
        error: false,
        loading: false,
      };
    case DESCARGAR_PRODUCTOS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case TEST:
      return {
        ...state,
        test: 'Testing',
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminado: action.payload,
      };
    case PRODUCTO_ELIMINADO_CORRECTO:
      return {
        ...state,
        productos: state.productos.filter((producto) => producto.id !== action.payload),
        productoEliminado: null,
      };
    case PRODUCTO_ELIMINADO_ERROR:
    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoEditado: action.payload,
      };
    case PRODUCTO_EDITAR_CORRECTO:
      return {
        ...state,
        productoEditado: null,
        productos: state.productos
          .map((producto) => (producto === action.payload.id ? action.payload : producto)),
      };
    default:
      return state;
  }
};
export default ProductosReducer;
