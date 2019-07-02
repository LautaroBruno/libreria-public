import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const DF = require('../../DataFetcher/product')

function CodeBarUpdDialog(props) {
  const [barCode, setBarCode] = React.useState('')

  const { updateData, setOpenDialogBarCode, productToUpdate, open } = props

  React.useEffect(() => {
    setBarCode(productToUpdate.barCode)
  }, [productToUpdate.barCode])

  const displayUserErrors = (errors) => {
    errors.forEach((err) => { props.enqueueSnackbar(err.message, { variant: 'error' }) })
  }

  const displayUknownErrors = (error) => {
    console.log(error)
    props.enqueueSnackbar(error.message, { variant: 'error' })
  }



  const handleClose = () => {
    setOpenDialogBarCode(false)
  }

  const handleCloseOnConfirm = () => {
    const { id, manualCode, description, price } = productToUpdate
    if (productToUpdate.barCode !== barCode)
      DF.default.updateProduct(id, { barCode, manualCode, description, price }).then(
        (result) => {
          if (result.errors)
            displayUserErrors(result.errors)
          else
            props.enqueueSnackbar(`Se actualizo el producto ${result.data.updateProduct.description}`, {
              variant: 'success',
            }
            )
          setTimeout(() => {
            updateData()
          }, 10);

        }
      ).catch((e) => displayUknownErrors(e))

    setOpenDialogBarCode(false)
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setTimeout(() => {
        handleCloseOnConfirm()
      }, 10);
    }
  }

  const handleEdit = e => {
    if (!isNaN(e.target.value))
      if (e.target.value.length < 16)
        setBarCode(e.target.value)

  }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Modificar Codigo de Barras"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          margin="dense"
          value={barCode}
          onChange={handleEdit}
          label="Codigo de Barras"
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

export default withSnackbar(CodeBarUpdDialog)