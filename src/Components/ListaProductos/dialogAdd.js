import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';

const DF = require('../../DataFetcher/product')




function AddProductDialog(props) {

  const { openAddProduct, setOpenAddProduct } = props
  const { updateme, setupdateme } = props

  const [description, setDescription] = React.useState('')
  const [barCode, setBarCode] = React.useState('')
  const [manualCode, setManualCode] = React.useState('')
  const [price, setPrice] = React.useState('')

  const handleKeyDown = e => {
    if (e.key === "Enter") {

      handleCloseOnConfirm()
    }

  }

  const handleClose = e => {
    setOpenAddProduct(false)
  }

  const displayUserErrors = (errors) => {
    errors.forEach((err) => { props.enqueueSnackbar(err.message, { variant: 'error' }) })
  }

  const displayUknownErrors = (error) => {
    props.enqueueSnackbar(error.message, { variant: 'error' })
  }

  const handleCloseOnConfirm = e => {
    if (submit()) {
      DF.default.addProduct({ description, barCode, manualCode, price }).then(
        (result) => {
          if (result.errors)
            displayUserErrors(result.errors)
          else
            props.enqueueSnackbar(`Se agrego el producto ${result.data.addProduct.description}`, { variant: 'success' })
        }
      ).catch((e) => displayUknownErrors(e))
    }
    setupdateme(!updateme)
    setOpenAddProduct(false)

  }

  const submit = () => {
    if (description === '') {
      props.enqueueSnackbar('Producto es vacio', { variant: 'error' })
      return false
    }
    if (price === '') {
      props.enqueueSnackbar('Precio no puede estar vacio', { variant: 'error' })
      return false
    }

    return true

  }

  return (


    <Dialog
      open={openAddProduct}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Modificar Cantidad"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          margin="dense"
          value={description}
          onChange={e => {
            if (e.target.value.length < 200)
              setDescription(e.target.value)
          }
          }
          label="Descripcion"
          fullWidth
          onFocus={(e) => { e.target.select() }}
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="dense"
          value={barCode}
          onChange={e => {
            if (!isNaN(e.target.value))
              if (e.target.value.length < 15)
                setBarCode(e.target.value)
          }
          }
          label="Codigo de Barras"
          fullWidth
          onFocus={(e) => { e.target.select() }}
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="dense"
          value={manualCode}

          onChange={e => {
            if (e.target.value.length < 9)
              setManualCode(e.target.value)
          }
          }

          label="Codigo Manual"
          fullWidth
          onFocus={(e) => { e.target.select() }}
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="dense"
          value={price}
          onChange={e => {
            if (!isNaN(e.target.value))
              if (e.target.value.length < 6)
                setPrice(e.target.value)
          }
          }
          label="Precio"
          fullWidth
          onFocus={(e) => { e.target.select() }}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
          </Button>
        <Button onClick={handleCloseOnConfirm} variant="contained" color="primary">
          Aceptar
          </Button>
      </DialogActions>
    </Dialog>

  )
}

export default withSnackbar(AddProductDialog)