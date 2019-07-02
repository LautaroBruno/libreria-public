import React from 'react'
import useStyles from '../Common/styles'


import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { ContextVenta } from "./contexVentas"

//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { withSnackbar } from 'notistack';
//const DF = require('../../DataFetcher/sale')
import { addSale } from '../../DataFetcher/sale'

const CreateSale = (props) => {
  const classes = useStyles();
  let { state, dispatch, openSaleConfirm, setOpenSaleConfirm, inputSearch } = React.useContext(ContextVenta);

  // para dialogo descarte
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);
  }
  function handleCloseOnDiscard() {
    setOpen(false);
    dispatch({ type: 'resetSale' })
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);
  }

  const discardSale = () => {
    if (state.actualSale.length > 0)
      setOpen(true);
  }

  function handleCloseWithoutConfirm() {
    setOpenSaleConfirm(false);
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);
  }

  async function handleCloseOnConfirm() {
    setOpenSaleConfirm(false);
    let productList = []
    state.actualSale.forEach(prod => {
      productList.push({ id: prod.id, quantity: Number(prod.quantity), discount: 0, price: Number(prod.price) })
    });
    let result = await addSale(productList)

    if (result.errors)
      result.errors.forEach((err) => { props.enqueueSnackbar(err.message, { variant: 'error' }) })
    else {
      props.enqueueSnackbar(`Se genero venta ${result.data.addSale.numberSale} de valor $${result.data.addSale.total}`, { variant: 'success' })
      dispatch({ type: 'resetSale' })
    }

    inputSearch.current.focus() // no necesita esperar xq hay un await arriba que demora
  }

  const confirmSale = () => {
    if (state.actualSale.length > 0)
      setOpenSaleConfirm(true);
  }

  return (

    <div className={classes.div_create_sale}>

      <Button variant="contained" color="secondary" className={classes.boton_icono_izquierda} onClick={discardSale}>
        <DeleteIcon className={classes.icono_izquierda} />
        Descartar
      </Button>

      <Button variant="contained" color="primary" className={classes.boton_icono_izquierda} onClick={confirmSale}>
        <SaveIcon className={classes.icono_izquierda} />
        Guardar
        <div style={{
          paddingLeft: 5
        }}>{'[F8]'}</div>
      </Button>

      {/*Dialogo confirmacion de descarte de venta */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Esta seguro de descartar la venta actual?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se perderan todos los items agregados hasta el momento
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseOnDiscard} variant="contained" color="primary" autoFocus>
            Descartar
          </Button>
        </DialogActions>
      </Dialog>

      {/*Dialogo confirmacion de venta */}

      <Dialog
        open={openSaleConfirm}
        onClose={handleCloseWithoutConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Esta seguro de Confirmar la venta actual?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se confirman {state.actualSale.length} {state.actualSale.length > 1 ? 'items' : 'item'}. Por un valor de ${state.totalSale}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithoutConfirm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseOnConfirm} variant="contained" color="primary" autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

    </div>

  )
}
export default withSnackbar(CreateSale);