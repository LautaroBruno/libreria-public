import React from 'react'
import Paper from '@material-ui/core/Paper';
import useStyles from '../Common/styles'
import VentaActual from './ventaActual'
import Typography from '@material-ui/core/Typography';

import AddProduct from './addProduct'
import TotalSaleInfo from './totalSaleInfo'
import { ContextVenta } from "./contexVentas";
import CreateSale from './createSale'

import { withSnackbar } from 'notistack';

const Ventas = (props) => {
  const classes = useStyles();

  let { state, dispatch, inputSearch, setOpenSaleConfirm } = React.useContext(ContextVenta);
  const handleUserKeyPress = React.useCallback(event => {
    const { key } = event;
    if (key === "F5") {
      event.preventDefault() // previene la accion default... es decir no se mueve el cursor
      inputSearch.current.focus()
    }
    if (key === "F8") {
      event.preventDefault() // previene la accion default... es decir no se mueve el cursor
      if (state.actualSale.length > 0)
        setOpenSaleConfirm(true)
    }

  }, [state.actualSale]); // actualiza la funcion callback cuando cambia state.actualsale



  React.useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, state.actualSale]);

  return (

    <div className={classes.root_venta}>

      <Paper className={classes.paper_venta_agregar_productos}>
        <AddProduct />
      </Paper>

      <Paper className={classes.paper_venta_carrito}>
        <div>
          <Typography variant="h4">
            Venta Actual
          </Typography>
        </div>

        <VentaActual />

        <div
          style={{
            display: 'flex',
            width: '100%'
          }}>

          <div
            style={{
              width: '40%',
            }}>
          </div>
          <TotalSaleInfo />

        </div>
        <CreateSale />
      </Paper>

    </div>

  )
}
export default withSnackbar(Ventas);
