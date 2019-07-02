import React from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import localizationMT from '../Common/localizationMaterialTable'

import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { withSnackbar } from 'notistack';

const DF = require('../../DataFetcher/product')

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const fixWidth = {
  width: 100,
  maxWidth: 100,
  height: 35,
  paddingTop: 0,
  paddingBottom: 0,
}

const fixWidthPrice = {
  width: 90,
  maxWidth: 90,
  height: 35,
  paddingTop: 0,
  paddingBottom: 0,
}

// IMPORTANTE EL OVERFLOW!!!!
// IMPORTANTE 2: setearle tamanio a todas las columnas para 
//que no 'bailen' al cambiar pag
const fixWidthOverFlow =
{
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  height: 35,
  paddingTop: 0, //importante.. setear solo padding top y bottom
  paddingBottom: 0,  //
  maxWidth: 200,// 
}

const actionsCellStyle = { //dont work
  height: 35,
  margintTop: 0,
  marginBottom: 0,
  paddingTop: 0,
  paddingBottom: 0,
}

const columns = [
  {
    title: 'Descripcion', field: 'description', sorting: false,
    cellStyle: fixWidthOverFlow, headerStyle: fixWidthOverFlow,
  },

  { title: 'C.Barras', field: 'barCode', cellStyle: fixWidth, headerStyle: fixWidth, sorting: false },
  { title: 'C.Manual', field: 'manualCode', cellStyle: fixWidth, headerStyle: fixWidth, sorting: false },

  {
    title: 'Precio', field: 'price',
    cellStyle: fixWidthPrice, headerStyle: fixWidthPrice, type: 'currency', sorting: false
  },
]

function Tabla(props) {

  const [updateme, setupdateme] = props.updateme

  const [openDelete, setOpenDelete] = React.useState({ open: false, prodToDelete: null });

  const [openEdit, setOpenEdit] = React.useState({ open: false, prodToEdit: { description: "", barCode: "", manualCode: "", price: "" } });

  const handleCloseDelete = () => {
    setOpenDelete({ open: false, prodToDelete: null })
  }

  const handleCloseDeleteOnConfirm = () => {
    DF.default.deleteProduct(openDelete.prodToDelete.id).then(
      (result) => {
        if (result.errors)
          displayUserErrors(result.errors)
        else
          props.enqueueSnackbar(`Se borro el producto ${openDelete.prodToDelete.description}`, { variant: 'success' })
        setupdateme(!updateme)
      }
    ).catch((e) => displayUknownErrors(e))
    setOpenDelete({ open: false, prodToDelete: null })
  }

  const handleCloseEdit = () => {
    setOpenEdit({ open: false, prodToEdit: { description: "", barCode: "", manualCode: "", price: "" } })
  }

  const handleCloseEditOnConfirm = () => {
    const { barCode, manualCode, description, price } = openEdit.prodToEdit
    DF.default.updateProduct(openEdit.prodToEdit.id, { barCode, manualCode, description, price }).then(
      (result) => {
        if (result.errors)
          displayUserErrors(result.errors)
        else
          props.enqueueSnackbar(`Se actualizo el producto ${result.data.updateProduct.description}`, {
            variant: 'success',
          }
          )
        setupdateme(!updateme)
      }
    ).catch((e) => displayUknownErrors(e))

    setOpenEdit({ open: false, prodToEdit: { description: "", barCode: "", manualCode: "", price: "" } })

  }

  const handleKeyDownEdit = e => {
    if (e.key === "Enter") {
      handleCloseEditOnConfirm()
    }
  }


  const displayUserErrors = (errors) => {
    errors.forEach((err) => { props.enqueueSnackbar(err.message, { variant: 'error' }) })
  }

  const displayUknownErrors = (error) => {
    console.log(error)
    props.enqueueSnackbar(error.message, { variant: 'error' })
  }

  return (
    <div style={{ overflowY: 'auto', flexGrow: 1 }}>
      <MaterialTable
        icons={tableIcons}
        title="no se muestra porque lo saque de opciones"
        columns={columns}
        data={props.data}

        options={{
          actionsColumnIndex: -1, debounceInterval: 500, pageSize: 12,
          pageSizeOptions: [], showTitle: false, toolbarButtonAlignment: 'left',
          paging: false, // LAUTARO ACA
          toolbar: false,
          actionsCellStyle: actionsCellStyle
        }}
        components={{
          Container: props => <div {...props} />
        }}
        localization={localizationMT}
        actions={[
          {
            icon: () => <Icon style={{ fontSize: 20, padding: 0, margin: 0 }}>
              create
              </Icon>, //delete_outline
            tooltip: 'Editar Producto',
            onClick: (event, rowData) => {
              setOpenEdit({ open: true, prodToEdit: { ...rowData } })
            }
          },
          {
            icon: () => <Icon color="error" style={{ fontSize: 20, padding: 0, margin: 0 }}>
              delete_outline
              </Icon>, //delete_outline
            tooltip: 'Borrar',
            onClick: (event, rowData) => {
              setOpenDelete({ open: true, prodToDelete: rowData })
            }
          }
        ]}
      />
      {/*Dialogo confirmacion de borrado de item */}

      <Dialog
        open={openDelete.open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmacion Eliminar Producto"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Desea eliminar el Producto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseDeleteOnConfirm} variant="contained" color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/*Dialogo confirmacion de editado de product */}

      <Dialog
        open={openEdit.open}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Modificar Cantidad"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            margin="dense"
            value={openEdit.prodToEdit.description}
            onChange={e => {
              if (e.target.value.length < 200)
                setOpenEdit({ ...openEdit, prodToEdit: { ...openEdit.prodToEdit, description: e.target.value } })
            }
            }
            label="Descripcion"
            fullWidth
            onFocus={(e) => { e.target.select() }}
            onKeyDown={handleKeyDownEdit}
          />
          <TextField
            margin="dense"
            value={openEdit.prodToEdit.barCode}
            onChange={e => {
              if (!isNaN(e.target.value))
                if (e.target.value.length < 15)
                  setOpenEdit({ ...openEdit, prodToEdit: { ...openEdit.prodToEdit, barCode: e.target.value } })
            }
            }
            label="Codigo de Barras"
            fullWidth
            onFocus={(e) => { e.target.select() }}
            onKeyDown={handleKeyDownEdit}
          />
          <TextField
            margin="dense"
            value={openEdit.prodToEdit.manualCode}
            onChange={e => {
              if (e.target.value.length < 9)
              setOpenEdit({ ...openEdit, prodToEdit: { ...openEdit.prodToEdit, manualCode: e.target.value } })}
            }
            label="Codigo Manual"
            fullWidth
            onFocus={(e) => { e.target.select() }}
            onKeyDown={handleKeyDownEdit}
          />
          <TextField
            margin="dense"
            value={openEdit.prodToEdit.price}
            onChange={e => {
              if (!isNaN(e.target.value))
                if (e.target.value.length < 6)
                  setOpenEdit({ ...openEdit, prodToEdit: { ...openEdit.prodToEdit, price: e.target.value } })
            }
            }
            label="Precio"
            fullWidth
            onFocus={(e) => { e.target.select() }}
            onKeyDown={handleKeyDownEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseEditOnConfirm} variant="contained" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default withSnackbar(Tabla)