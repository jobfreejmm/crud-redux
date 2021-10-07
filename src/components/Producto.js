/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal2 from 'sweetalert2';
import { eliminarProductoAction, obtenerProductoAction } from '../actions/productosActions';

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();

  const onClick = () => {
    swal2.fire({
      title: `Quieres eliminar este registro ? ${nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonCOlor: '#d33',
      confirmButtonText: 'Si eliminar',
    }).then((result) => {
      if (result.value) {
        dispatch(eliminarProductoAction(id));
      }
    });
  };
  const history = useHistory();
  // redireccionamos
  const onClickRedirect = () => {
    dispatch(obtenerProductoAction(producto));
    history.push(`/productos/editar/${id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">{precio}</span>
      </td>
      <td className="acciones">
        <button type="button" className="btn btn-primary mr-2" onClick={onClickRedirect}>
          Editar
        </button>
        <button type="button" className="btn btn-danger" onClick={onClick}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
