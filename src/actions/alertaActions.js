import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types';

export const mostrarAlerta = (alerta) => (
  (dispatch) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: alerta,
    });
  }
);

export const ocultarAlerta = () => (
  (dispatch) => {
    dispatch({
      type: OCULTAR_ALERTA,
    });
  }
);
