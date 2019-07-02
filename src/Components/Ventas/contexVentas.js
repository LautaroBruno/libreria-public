import React, { useRef } from 'react';
let ContextVenta = React.createContext();
////////////////////////////////
//  Estado inicial
////////////////////////////////
let initialState = {
  actualSale: [],
  subTotalSale: 0,
  discountSale: 0,
  totalSale: 0,
  searchText: "",
  selected: false,
  searchProducts: {
    data: [],
    page: 0,
    rowsPerPage: 10,
    totalDocs: 0,
  },
  selectedProduct: {
    index: null,
    data: {
      id: '',
      description: '',
      price: 0,
      barCode: '',
      manualCode: '',
    },
    quantity: 1

  }
};
////////////////////////////////
//  REDUCER (DISPATCH -> ACCION que actualiza los estados)
////////////////////////////////
let reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "resetSale":
      return deleteSale(state, action)

    case "addProductToSale":
      return addProductToSale(state, action)

    case "searchProducts":
      return { ...state, searchProducts: action.payload, selectedProduct: initialState.selectedProduct }

    case "perfectMatchProduct":
      return {
        ...state, searchProducts: { ...state.searchProducts, page: 0, totalDocs: 1, data: action.payload },
        selectedProduct: { ...state.selectedProduct, index: 0, data: action.payload[0] }
      }

    case "updateData":
      return {
        ...state, searchProducts: { ...state.searchProducts, data: action.payload }
      }

    case "searchProducts.changePage":
      return { ...state, searchProducts: { ...state.searchProducts, page: action.payload } }

    case "searchProducts.decrementPage":
      return { ...state, searchProducts: { ...state.searchProducts, page: getPageChange(state.searchProducts, -1) } }

    case "searchProducts.incrementPage":
      return { ...state, searchProducts: { ...state.searchProducts, page: getPageChange(state.searchProducts, 1) } }

    case "resetSelection":
      return { ...state, selectedProduct: initialState.selectedProduct }

    case "clickRowSelection":
      return { ...state, selectedProduct: { ...state.selectedProduct, data: action.payload, index: state.searchProducts.data.indexOf(action.payload) } }

    case "arrowKeysSelection":
      return { ...state, selectedProduct: arrowKeySelection(state, action.payload) }

    case "updatePrice":
      return {
        ...state, selectedProduct:
          { ...state.selectedProduct, data: { ...state.selectedProduct.data, price: action.payload } }
      }

    case "updateQuantity":
      return {
        ...state, selectedProduct:
          { ...state.selectedProduct, quantity: action.payload }
      }

    case "deleteProductOnSale":
      return deleteProductOnSale(state, action)

    case "updateQuantityOnSale":
      return updateQuantityOnSale(state, action)

    case "SetSearchText":
      return {
        ...state, searchText: action.payload
      }

  }
};

////////////////////////////////
//  HELPERS de los DISPATCH
////////////////////////////////
const getPageChange = (searchProducts, jump) => {
  let newPage = searchProducts.page + jump
  if (newPage < 0) return searchProducts.page
  if (searchProducts.totalDocs / searchProducts.rowsPerPage < newPage) return searchProducts.page
  return newPage
}

const arrowKeySelection = (state, key) => {
  let index = state.selectedProduct.index
  if (key === 'ArrowUp') index--
  if (key === 'ArrowDown' && index === null) index = 0
  else if (key === 'ArrowDown') index++

  if (index > state.searchProducts.data.length - 1 | index < 0) return state.selectedProduct
  let data = state.searchProducts.data[index]
  let quantity = state.selectedProduct.quantity
  return { index, data, quantity }
}

const addProductToSale = (state, action) => {
  let actualSale = [...state.actualSale]//, action.payload]
  actualSale.push(action.payload)
  let { subTotalSale, discountSale, totalSale } = updateTotalSale(actualSale)
  return {
    ...state, subTotalSale, discountSale, totalSale, actualSale,
    selectedProduct: initialState.selectedProduct
  }
}

const deleteSale = (state, action) => {
  let actualSale = []
  let { subTotalSale, discountSale, totalSale } = updateTotalSale(actualSale)
  return {
    ...state, searchText: '', subTotalSale, discountSale, totalSale, actualSale,
    selectedProduct: initialState.selectedProduct
  }
}

const deleteProductOnSale = (state, action) => {
  let actualSaleWithRemoved = [...state.actualSale]
  let actualSale = actualSaleWithRemoved.filter(prod => (prod.tableData.id !== action.payload.tableData.id))

  let { subTotalSale, discountSale, totalSale } = updateTotalSale(actualSale)

  return {
    ...state, subTotalSale, discountSale, totalSale, actualSale,
    selectedProduct: initialState.selectedProduct
  }
}

const updateQuantityOnSale = (state, action) => {
  let actualSaleWithOldQuantity = [...state.actualSale]

  let actualSale = []
  actualSaleWithOldQuantity.forEach(prod => {
    if (prod.tableData.id !== action.payload.tableData.id) actualSale.push(prod)
    else actualSale.push({ ...prod, quantity: action.payload.quantity, subtotal: action.payload.quantity * action.payload.price })
  })

  let { subTotalSale, discountSale, totalSale } = updateTotalSale(actualSale)

  return {
    ...state, subTotalSale, discountSale, totalSale, actualSale,
    selectedProduct: initialState.selectedProduct
  }
}

const updateTotalSale = (actualSale) => {
  let subTotalSale = 0, discountSale = 0, totalSale = 0
  actualSale.forEach(product => {
    subTotalSale += product.quantity * product.price
    totalSale += product.quantity * product.price
  });

  return { subTotalSale, discountSale, totalSale }
}

////////////////////////////////
//DEFINICION DEL CONTEXT PROVIDER
////////////////////////////////

function ContextVentaProvider(props) {

  let [state, dispatch] = React.useReducer(reducer, initialState);

  // para dialogo confirmacion de venta
  const [openSaleConfirm, setOpenSaleConfirm] = React.useState(false);

  const inputSearch = useRef(null);
  let value = { state, dispatch, inputSearch, openSaleConfirm, setOpenSaleConfirm };

  return (
    <ContextVenta.Provider value={value}>{props.children}</ContextVenta.Provider>
  );
}

//let ContextVentaConsumer = ContextVenta.Consumer;

export { ContextVenta, ContextVentaProvider };

