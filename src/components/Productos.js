/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { descargaProductosAction } from '../actions/productosActions';
import Producto from './Producto';

const Productos = () => {
  const loading = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const productos = useSelector((state) => state.productos.productos);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(descargaProductosAction());
  }, []);
  return (
    <>
      <h2 className="text-center my-5">Listado productos</h2>
      {error
        ? (
          <p className="font-weight-bold alert-danger
      text-center mt-4"
          >
            Hubo un error
          </p>
        ) : null}
      {loading ? <p>Cargando...</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 && productos ? productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))
            : (<p>No hay productos</p>)}

        </tbody>
      </table>

    </>
  );
};
export default Productos;
