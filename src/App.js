/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';
import { ocultarAlerta } from './actions/alertaActions';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(ocultarAlerta());
  }, []);

  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/" component={Productos} />
          <Route exact path="/productos/nuevo">
            <NuevoProducto />
          </Route>
          <Route exact path="/productos/editar/:id" component={EditarProducto} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
