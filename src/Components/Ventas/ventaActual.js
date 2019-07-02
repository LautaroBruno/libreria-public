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

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import { ContextVenta } from "./contexVentas"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Icon from '@material-ui/core/Icon';


import { withSnackbar } from 'notistack';

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
  width: 80,
  maxWidth: 80,
  height: 35,
  paddingTop: 0,
  paddingBottom: 0,
}
const fixWidthR = {
  ...fixWidth,
  textAlign: 'center',
  height: 35,
  paddingTop: 0,
  paddingBottom: 0,
}

const fixWidthOverFlow =
{
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  // aparentemente para que escale bien, la col mas larga debe tener
  // no definido el width, pero si el maxwidth
  //width:200, 
  maxWidth: 150,// 
  height: 35,
  paddingTop: 0,
  paddingBottom: 0,
}

const columns = [
  {
    title: 'Descripcion', field: 'description', sorting: false, editable: 'never',
    cellStyle: fixWidthOverFlow, headerStyle: fixWidthOverFlow,
  },
  {
    title: 'Cantidad', field: 'quantity',
    cellStyle: fixWidthR, headerStyle: fixWidthR, sorting: false
  },
  {
    title: 'Precio', field: 'price',
    cellStyle: fixWidth, headerStyle: fixWidth, type: 'currency', sorting: false, editable: 'never'
  },
  {
    title: 'Importe', field: 'subtotal',
    cellStyle: fixWidth, headerStyle: fixWidth, type: 'currency', sorting: false, editable: 'never'
  },
]

function VentaActual(props) {

  // USANDO EL CONTEXT
  let { state, dispatch, inputSearch } = React.useContext(ContextVenta);

  const [openDelete, setOpenDelete] = React.useState({ open: false, prodToDelete: null });

  const [openEdit, setOpenEdit] = React.useState({ open: false, prodToEdit: null, edit: "" });

  const handleCloseDelete = () => {
    setOpenDelete({ open: false, prodToDelete: null })
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);
  }

  const handleCloseDeleteOnConfirm = () => {
    dispatch({ type: "deleteProductOnSale", payload: openDelete.prodToDelete })
    setOpenDelete({ open: false, prodToDelete: null })
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);

  }

  const handleCloseEdit = () => {
    setOpenEdit({ open: false, prodToEdit: null, edit: "" })
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);
  }

  const handleCloseEditOnConfirm = () => {
    let prodToEdit = { ...openEdit.prodToEdit }
    prodToEdit.quantity = openEdit.edit

    dispatch({ type: "updateQuantityOnSale", payload: prodToEdit })
    setOpenEdit({ open: false, prodToEdit: null, edit: "" })
    setTimeout(() => {
      inputSearch.current.focus()
    }, 10);

  }

  const handleEditQuantity = e => {
    if (!isNaN(e.target.value))
      if (e.target.value.length < 6)
        setOpenEdit({ ...openEdit, edit: e.target.value })
  }

  const handleKeyDownEdit = e => {
    if (e.key === "Enter") {
      handleCloseEditOnConfirm()
    }
  }



  return (
    <div style={{
      overflowY: 'auto',
    }}>
      <MaterialTable

        icons={tableIcons}
        data={state.actualSale}
        columns={columns}
        options={{
          actionsColumnIndex: -1, debounceInterval: 500, pageSize: 13,
          pageSizeOptions: [], showTitle: true, toolbarButtonAlignment: 'left',
          paging: false,
          toolbar: false,
        }}
        components={{
          Container: props => <div {...props} />
        }}
        localization={{ ...localizationMT, body: { ...localizationMT.body, emptyDataSourceMessage: 'No hay productos agregados' } }}
        actions={[
          {
            icon: () => <Icon style={{ fontSize: 20, padding: 0, margin: 0 }}>
              create
              </Icon>, //delete_outline
            tooltip: 'Editar Cantidad',
            onClick: (event, rowData) => {
              setOpenEdit({ open: true, prodToEdit: rowData, edit: rowData.quantity })
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
        <DialogTitle id="alert-dialog-title">{"Confirmacion de borado de Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Desea Borrar el item?
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

      {/*Dialogo confirmacion de editado de item */}

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
            value={openEdit.edit}
            onChange={handleEditQuantity}
            label="Cantidad"
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
  )
}

export default withSnackbar(VentaActual)
