import React, { useRef } from 'react';
import { ContextVenta } from "./contexVentas";
import { withSnackbar } from 'notistack';


import TablePagination from '@material-ui/core/TablePagination';

import Typography from '@material-ui/core/Typography';

import useStyles from '../Common/styles'

import AddProductTable from './addProductTable'
import AddProductHead from './addProductHead'

function AddProduct(props) {
  let { state, dispatch } = React.useContext(ContextVenta);
  const inputQuantity = useRef(null);
  const inputSearch = useRef(null);
  const inputPrice = useRef(null);

  const classes = useStyles();

  const handleChangePage = async (e, newPage) => {
    dispatch({ type: "searchProducts.changePage", payload: newPage })
  }
  return (
    <div className={classes.div_add_product}>
      <div>
        <Typography variant="h4">Agregar Productos</Typography>
      </div>

      <AddProductHead inputQuantity={inputQuantity}
        inputPrice={inputPrice}
        inputSearch={inputSearch} />

      <AddProductTable inputQuantity={inputQuantity} />

      <div>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={state.searchProducts.totalDocs || 0}
          rowsPerPage={state.searchProducts.rowsPerPage}
          page={state.searchProducts.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count}`}
        />
      </div>

    </div>
  )
}

export default withSnackbar(AddProduct)
