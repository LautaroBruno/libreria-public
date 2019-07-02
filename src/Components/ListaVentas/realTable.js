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
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';
import localizationMT from '../Common/localizationMaterialTable'
const DF = require('../../DataFetcher/sells')



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
  ViewColumn: ViewColumn,
  KeyboardArrowRight: KeyboardArrowRight
};


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  Table: {
    width: 500
  }

}));



const fixWidth = {
  width: 150,
  maxWidth: 150,
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

const RealTable = props => {

  const [updateme, setupdateme] = props.updateme

  const [openDelete, setOpenDelete] = React.useState({ open: false, prodToDelete: null });

  const classes = useStyles();


  const displayUserErrors = (errors) => {
    errors.forEach((err) => { props.enqueueSnackbar(err.message, { variant: 'error' }) })
  }

  const displayUknownErrors = (error) => {
    props.enqueueSnackbar(error.message, { variant: 'error' })
  }

  const handleCloseDelete = () => {
    setOpenDelete({ open: false, prodToDelete: null })
  }

  const handleCloseDeleteOnConfirm = () => {
    DF.default.deleteSale(openDelete.prodToDelete.id).then(
      (result) => {
        if (result.errors)
          displayUserErrors(result.errors)
        else
          props.enqueueSnackbar(`Se borro la venta por $${parseFloat(openDelete.prodToDelete.total).toFixed(2)}`, { variant: 'success' })
        setupdateme(!updateme)
      }
    ).catch((e) => displayUknownErrors(e))
    setOpenDelete({ open: false, prodToDelete: null })
  }


  return (
    <div>
      <MaterialTable
        title={'Ventas'}
        options={{
          paging: false, // LAUTARO ACA
          search: false, actionsColumnIndex: -1, debounceInterval: 500, showTitle: false, toolbarButtonAlignment: 'left',
          toolbar: false,
        }}

        icons={tableIcons}
        columns={[
          { title: 'Id Venta', field: 'numberSale', cellStyle: fixWidthOverFlow, headerStyle: fixWidthOverFlow, sorting: false },
          { title: 'Fecha de venta', field: 'createdAt', type: 'numeric', cellStyle: fixWidth, headerStyle: fixWidth, sorting: false },
          { title: 'Total', field: 'total', type: 'currency', cellStyle: fixWidthPrice, headerStyle: fixWidthPrice, sorting: false },
        ]}

        data={props.data}
        localization={localizationMT}
        components={{
          Container: props => <div {...props} />
        }}

        actions={[
          {
            icon: () => <Icon color="error" style={{ fontSize: 20, padding: 0, margin: 0 }}>
              delete_outline
            </Icon>, //delete_outline
            tooltip: 'Eliminar',
            onClick: (event, rowData) => {
              setOpenDelete({ open: true, prodToDelete: rowData })
            }
          }
        ]}


        detailPanel={rowData => {
          const poductsSold = rowData.productSold.map(product => {
            const cuttedPrice = parseFloat(product.price).toFixed(2)
            const cuttedTotal = parseFloat(product.price * product.quantity).toFixed(2)

            return (
              <TableRow key={Math.random()}>
                <TableCell>{product.description}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">${cuttedPrice}</TableCell>
                <TableCell align="right">${cuttedTotal}</TableCell>
              </TableRow>
            )
          })
          return (<div>
            <Container >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {poductsSold}
                </TableBody>
              </Table>
            </Container>
          </div>
          )
        }}
      />
      {/*Dialogo confirmacion de borrado de item */}

      <Dialog
        open={openDelete.open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmacion Eliminar Venta"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Desea eliminar la Venta?
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
    </div>
  )
}

export default withSnackbar(RealTable)