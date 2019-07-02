import React, { useEffect, useState } from 'react';
import useStyles from '../Common/styles'
import { ContextVenta } from "./contexVentas";
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CodeBarUpdDialog from '../Common/CodeBarUpdDialog'

const DF = require('../../DataFetcher/product')
let timer = null

function AddProductHead(props) {
  let { state, dispatch, inputSearch } = React.useContext(ContextVenta);
  const classes = useStyles();
  let { inputQuantity, inputPrice } = props
  const [hasFocus, setHasFocus] = useState(false)

  // barCode UPDATE
  const [updateBarCode, setUpdateBarCode] = useState(false)
  const [openDialogBarCode, setOpenDialogBarCode] = useState(false)
  const updateData = () => {
    setUpdateBarCode(!updateBarCode)
  }

  const handleSearch = async (e) => {
    const searchText = e.target.value.slice(0, 29);
    dispatch({ type: "SetSearchText", payload: searchText })
  }

  const handleKeyDown = async (e) => {

    if (e.key === "ArrowUp" | e.key === "ArrowDown" | e.key === "ArrowLeft" | e.key === "ArrowRight") {
      e.preventDefault() // previene la accion default... es decir no se mueve el cursor
    }

    if (e.key === "ArrowLeft")
      dispatch({ type: "searchProducts.decrementPage" })

    if (e.key === "ArrowRight")
      dispatch({ type: "searchProducts.incrementPage" })

    if (e.key === "ArrowUp" | e.key === "ArrowDown")
      dispatch({ type: "arrowKeysSelection", payload: e.key })

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault()
      inputQuantity.current.focus()
    }
    if (e.key === "F12") {
      if (state.selectedProduct.index !== null) {
        e.preventDefault()
        setOpenDialogBarCode(true)
      }
    }
  }

  const handleKeyQuantity = async (e) => {
    if (e.key === "Enter") {
      submit()
    }

    if (e.key === "F12") {
      if (state.selectedProduct.index !== null) {
        e.preventDefault()
        setOpenDialogBarCode(true)
      }
    }
  }

  const handleKeyPrice = async (e) => {
    if (e.key === "Enter") {
      submit()
    }
    if (e.key === "Tab") {
      e.preventDefault()
      inputSearch.current.focus();
    }
    if (e.key === "F12") {
      if (state.selectedProduct.index !== null) {
        e.preventDefault()
        setOpenDialogBarCode(true)
      }
    }
  }

  const submit = () => {
    if (checkSubmit()) {
      let { id, description, price } = state.selectedProduct.data
      let quantity = state.selectedProduct.quantity
      let product = {
        id, description, quantity, price, subtotal: (Number(price) * Number(quantity))
      }
      dispatch({ type: 'addProductToSale', payload: product })
      dispatch({ type: "SetSearchText", payload: "" })
      inputSearch.current.focus();
    }
  }

  const checkSubmit = () => {

    if (state.selectedProduct.index === null) {
      props.enqueueSnackbar(`Debe Seleccionar un producto`, { variant: 'error' })
      inputSearch.current.focus();
      return false
    }

    if (Number(state.selectedProduct.quantity) <= 0 | state.selectedProduct.quantity === '' | isNaN(state.selectedProduct.quantity)) {
      props.enqueueSnackbar(`Ingrese Cantidad`, { variant: 'error' })
      inputQuantity.current.focus();
      return false
    }
    if (Number(state.selectedProduct.data.price) === 0) {
      props.enqueueSnackbar(`Ingrese Precio`, { variant: 'error' })
      inputPrice.current.focus();
      return false
    }
    return true

  }

  const handleQuantity = async (e) => {
    if (!isNaN(e.target.value))
      if (e.target.value.length < 6)
        dispatch({ type: "updateQuantity", payload: e.target.value })
  }

  const handlePrice = async (e) => {
    if (!isNaN(e.target.value))
      if (e.target.value.length < 6)
        dispatch({ type: "updatePrice", payload: e.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      // buscamos match especifico por codigo de barras o manual code
      const resultSpecific = await DF.default.getSpecificProducts(state.searchText)
      let dataSpecific = resultSpecific.data.specificSearchProduct
      // si conseguimos perfect match lo devolvemos y no buscamos en todo
      if (dataSpecific !== null) {
        dispatch({ type: "perfectMatchProduct", payload: [dataSpecific] })
        return
      }
      // caso contrario hacemos busqueda normal, reseteando pagina
      const result = await DF.default.getAllProducts(state.searchText, state.searchProducts.rowsPerPage, 1,
        'description', true)
      let data = result.data.searchProducts.products
      //let totalDocs = result.data.searchProducts.pagination.totalDocs
      dispatch({ type: "updateData", payload: data })
    };

    //DELAY para evitar catastrofe de que lleguen datos mientras pediste otros
    //75 es suficiente para buscar por palabra
    clearTimeout(timer)
    timer = setTimeout(fetchData, 75)

  }, [updateBarCode]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await DF.default.getAllProducts(state.searchText, state.searchProducts.rowsPerPage, state.searchProducts.page + 1,
        'description', true)
      let data = result.data.searchProducts.products
      //let page = result.data.searchProducts.pagination.page
      let totalDocs = result.data.searchProducts.pagination.totalDocs
      dispatch({ type: "searchProducts", payload: { data, page: state.searchProducts.page, totalDocs, rowsPerPage: state.searchProducts.rowsPerPage } })
    };

    //DELAY para evitar catastrofe de que lleguen datos mientras pediste otros
    // 300 es suficiente para los cambios de pagina
    clearTimeout(timer)
    timer = setTimeout(fetchData, 300)

  }, [state.searchProducts.page]);

  useEffect(() => {
    const fetchData = async () => {
      // buscamos match especifico por codigo de barras o manual code
      const resultSpecific = await DF.default.getSpecificProducts(state.searchText)
      let dataSpecific = resultSpecific.data.specificSearchProduct
      // si conseguimos perfect match lo devolvemos y no buscamos en todo
      if (dataSpecific !== null) {
        dispatch({ type: "perfectMatchProduct", payload: [dataSpecific] })
        return
      }
      // caso contrario hacemos busqueda normal, reseteando pagina
      const result = await DF.default.getAllProducts(state.searchText, state.searchProducts.rowsPerPage, 1,
        'description', true)
      let data = result.data.searchProducts.products
      let totalDocs = result.data.searchProducts.pagination.totalDocs
      dispatch({ type: "searchProducts", payload: { data, page: 0, totalDocs, rowsPerPage: state.searchProducts.rowsPerPage } })
    };

    //DELAY para evitar catastrofe de que lleguen datos mientras pediste otros
    //75 es suficiente para buscar por palabra
    clearTimeout(timer)
    timer = setTimeout(fetchData, 75)

  }, [state.searchText]);

  const SearchTextOnBlur = () => {
    setHasFocus(false)
  }

  const SearchTextOnFocus = async (e) => {
    setHasFocus(true)
  }

  return (

    <div className={classes.div_search_header}>
      <TextField
        autoFocus={true}
        onFocus={SearchTextOnFocus}
        onBlur={SearchTextOnBlur}
        id="search-box"
        label={
          !hasFocus && state.selectedProduct.index !== null ?
            "Seleccionado" :
            "Buscador [F5]"
        }
        inputRef={inputSearch}
        value=
        {
          !hasFocus ?
            state.selectedProduct.data.description :
            state.searchText
        }
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        margin="dense"
        variant="outlined"
        //helperText={state.selectedProduct.data.description}
        fullWidth
      />
      <TextField
        inputRef={inputQuantity} // IMPORTANTE PA FOCUS
        label="Cantidad"
        value={state.selectedProduct.quantity}
        onChange={handleQuantity}
        onKeyDown={handleKeyQuantity}
        InputLabelProps={{ shrink: true }}
        margin="dense"
        variant="outlined"
        fullWidth
        onFocus={event => {
          event.target.select()
        }}
        error={(state.selectedProduct.quantity <= 0 |
          state.selectedProduct.quantity === '' |
          isNaN(state.selectedProduct.quantity)) &&
          state.selectedProduct.index !== null}
      />
      <TextField
        label="Precio"
        inputRef={inputPrice}
        value={state.selectedProduct.data.price}
        onChange={handlePrice}
        onKeyDown={handleKeyPrice}
        margin="dense"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        error={(state.selectedProduct.data.price === 0 |
          isNaN(state.selectedProduct.data.price)) &&
          state.selectedProduct.index !== null}
        helperText={(state.selectedProduct.data.price === 0 |
          isNaN(state.selectedProduct.data.price)) &&
          state.selectedProduct.index !== null ? "Ingrese Precio" : ""}
        onFocus={event => {
          event.target.select()
        }}
      />
      <div>
        <Tooltip title="[F12] Actualizar Codigo de Barras" placement="bottom">
          <IconButton size="medium"
            disabled={state.selectedProduct.index === null}
            onClick={() => (setOpenDialogBarCode(true))}
          >
            <Icon style={{ fontSize: 25, padding: 0, margin: 0, transform: 'rotate(90deg)'/*line_weight view_day*/ }}>
              view_day
          </Icon>
          </IconButton>
        </Tooltip>
        <CodeBarUpdDialog
          open={openDialogBarCode}
          setOpenDialogBarCode={setOpenDialogBarCode}
          productToUpdate={state.selectedProduct.data}
          updateData={updateData}
        />
      </div>

    </div>
  )

}

export default withSnackbar(AddProductHead)