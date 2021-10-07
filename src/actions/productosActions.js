/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import clienteAxios from '../config/clienteAxios';
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_CORRECTO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGAR_PRODUCTOS,
  DESCARGAR_PRODUCTOS_ERROR,
  DESCARGAR_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_CORRECTO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  TEST,
  COMENZAR_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_CORRECTO,
} from '../types';

export function test() {
  return {
    type: TEST,
  };
}

// crear nuevos productos

export function CrearNuevoProducto(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      await clienteAxios.post('/productos', producto);
      swal(
        'Correcto!',
        'Se ha enviado el producto correctamente!',
        'success',
      );

      // console.log('response', response);
      dispatch(agregarProductoCorrecto(producto));
      // eslint-disable-next-line no-console
      console.log('action', producto);
    } catch (error) {
      console.log(error);
      swal(
        'Error intenta nuevamente',
        'Intente mas tarde',
        'error',
      );
      dispatch(agregarProductoError(true));
    }
  };
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
});

const agregarProductoCorrecto = (producto) => ({
  type: AGREGAR_PRODUCTO_CORRECTO,
  payload: producto,
});

const agregarProductoError = (error) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: error,
});

// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS

export const descargaProductos = () => ({
  type: COMENZAR_DESCARGAR_PRODUCTOS,
  payload: true,
});

export const descargaProductosExito = (productos) => ({
  type: DESCARGAR_PRODUCTOS_EXITO,
  payload: productos,
});
export const descargaProductosError = (error) => ({
  type: DESCARGAR_PRODUCTOS_ERROR,
  payload: error,
});

export const descargaProductosAction = () => (
  async (dispatch) => {
    dispatch(descargaProductos());
    try {
      const response = await clienteAxios.get('/productos');
      console.log(response.data);
      dispatch(descargaProductosExito(response.data));
    } catch (error) {
      console.log(error.response);
      dispatch(descargaProductosError(true));
    }
  }
);
// SELECCCIONA Y ELIMINA EL PRODUCTO
const obtenerProductoLiminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});
const eliminarProducto = (id) => ({
  type: PRODUCTO_ELIMINADO_CORRECTO,
  payload: id,
});
const eliminarProductoError = (error) => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: error,

});
export const eliminarProductoAction = (id) => (
  async (dispatch) => {
    try {
      console.log(id);
      const response = await clienteAxios.delete(`/productos/${id}`);
      // console.log(response);
      dispatch(obtenerProductoLiminar(id));
      dispatch(eliminarProducto(id));
      swal2.fire(
        'Eliminado',
        'El registro ha sido eliminado',
        'success',
      );
    } catch (error) {
      dispatch(eliminarProductoError(true));
      console.log(error);
    }
  }
);

// Editar
const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//
const comenzarProductoEditar = (producto) => ({
  type: COMENZAR_PRODUCTO_EDITAR,
});
//
const productoEditarCorrecto = (producto) => ({
  type: PRODUCTO_EDITAR_CORRECTO,
  payload: producto,
});

export const obtenerProductoAction = (producto) => (
  (dispatch) => {
    try {
      dispatch(obtenerProductoEditar(producto));
    } catch (error) {
      console.log(error);
    }
  }
);

export const editarProductoAction = (producto) => (

  async (dispatch) => {
    console.log('prod', producto);
    dispatch(comenzarProductoEditar());
    try {
      const response = await clienteAxios.put(`/productos/${producto.id}`, producto);
      console.log(response);
      dispatch(productoEditarCorrecto(producto));
    } catch (error) {
      dispatch({
        type: PRODUCTO_ELIMINADO_ERROR,
      });
    }
  }
);
