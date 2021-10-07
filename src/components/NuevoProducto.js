/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';
import { CrearNuevoProducto, test } from '../actions/productosActions';
import alertaReducer from '../reducers/alertaReducer';
import { OCULTAR_ALERTA } from '../types';

const NuevoProducto = () => {
  const [datos, setDatos] = React.useState({
    nombre: '',
    precio: 0,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alertaState = useSelector((state) => state.alertas.alerta);
  // console.log('error', history);
  const { nombre, precio } = datos;
  // const agregarProductos = (producto) => dispatch(CrearNuevoProducto(producto));
  React.useEffect(() => {
    dispatch(ocultarAlerta());
  }, [ocultarAlerta]);

  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch(CrearProductoError());
    // validar
    if (nombre.trim() === '' || precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3',
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }
    dispatch(ocultarAlerta());
    // console.log(datos);
    // dispatch(CrearNuevoProducto(datos));
    dispatch(CrearNuevoProducto(datos));
    dispatch(test());
    history.push('/');
  };
  const onChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4font-weigth-bold">
              Agregar Producto
            </h2>
            {alertaState ? (
              <p className={`${alertaState.classes}`}>
                {alertaState.msg}
              </p>
            ) : null}
            {/* FORM */}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  name="nombre"
                  className="form-control"
                  type="text"
                  placeholder="Nombre Producto"
                  id="producto"
                  value={nombre}
                  onChange={onChange}
                />
              </div>
              {/* input price */}
              <div className="form-group">
                <label htmlFor="precio"> Precio</label>
                <input
                  name="precio"
                  type="number"
                  className="form-control"
                  placeholder="$50"
                  nombre={nombre}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weigth-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {loading ? <p> Cargando....</p> : null}
            {error ? (
              <p
                className="alert alert-danger p-2 mt-4"
              >
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NuevoProducto;
