import React from 'react'
import Tabla from './Lista'
import useStyles from '../Common/styles'
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AddProductDialog from './dialogAdd'

import TextField from '@material-ui/core/TextField';

const DF = require('../../DataFetcher/product')

// timer para delay de busqueda
let timer = null

const ListaProductos = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("")
  const [pagination, setPagination] = React.useState({
    rowsPerPage: 8,
    page: 0,
  })
  const [count, setCount] = React.useState(0)
  const [data, setData] = React.useState([])

  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const [updateme, setupdateme] = React.useState(false)

  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setPagination({ ...pagination, page: 0 })
  }

  React.useEffect(() => {
    const fetchData = async () => {
      let result = await DF.default.getAllProducts(searchText, pagination.rowsPerPage, pagination.page + 1,
        "description", true)
      setCount(result.data.searchProducts.pagination.totalDocs)
      setData(result.data.searchProducts.products)

    };

    //DELAY para evitar catastrofe de que lleguen datos mientras pediste otros
    //75 es suficiente para buscar por palabra
    clearTimeout(timer)
    timer = setTimeout(fetchData, 35)

  }, [searchText]);

  React.useEffect(() => {
    const fetchData = async () => {
      let result = await DF.default.getAllProducts(searchText, pagination.rowsPerPage, pagination.page + 1,
        "description", true)

      setCount(result.data.searchProducts.pagination.totalDocs)
      setData(result.data.searchProducts.products)

    };

    //DELAY para evitar catastrofe de que lleguen datos mientras pediste otros
    //75 es suficiente para buscar por palabra
    clearTimeout(timer)
    timer = setTimeout(fetchData, 35)

  }, [pagination, updateme]);

  const handleChangePage = (e, newPage) => {
    setPagination({ ...pagination, page: newPage })
  }

  return (
    <div className={classes.root_listaProductos}>
      <Paper className={classes.paper_listaProductos}>
        <div className={classes.div_search_add}>
          <TextField
            autoFocus={true}
            label={"Buscar"}
            value={searchText}
            onChange={handleSearch}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <Fab onClick={e => (setOpenAddProduct(true))} variant="contained" color="primary">
            <AddIcon />
          </Fab>
          <AddProductDialog setOpenAddProduct={setOpenAddProduct} openAddProduct={openAddProduct} updateme={updateme} setupdateme={setupdateme} />
        </div>

        <Tabla data={data} updateme={[updateme, setupdateme]} />

        <div>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={count || 0} // TOTAL DE DOCUMENTOS
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={handleChangePage}
            labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count}`}
          //onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>

  )
}

export default ListaProductos;