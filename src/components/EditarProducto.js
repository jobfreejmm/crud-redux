/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction, obtenerProductoEditar } from '../actions/productosActions';

const EditarProducto = (props) => {
  console.log(props);
  const { history } = props;
  const dispatch = useDispatch();
  const productoEditado = useSelector((state) => state.productos.productoEditado);

  const [datos, setDatos] = React.useState({
    nombre: '',
    precio: 0,
  });

  React.useEffect(() => {
    if (productoEditado !== null) {
      setDatos(productoEditado);
    }
  }, [productoEditado]);

  const { nombre, precio } = datos;

  const onChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(datos);
    dispatch(editarProductoAction(datos));
    history.push('/');
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center my-3">Editar Producto</h2>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={onChange}
                  value={nombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="$50"
                  name="precio"
                  onChange={onChange}
                  value={precio}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary text-uppercase w-100"
              >
                Editar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditarProducto;
