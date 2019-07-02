import React from 'react';
import { ContextVenta } from "./contexVentas";

import MaterialTable from 'material-table';
import localizationMT from '../Common/localizationMaterialTable'
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
  //fontWeight: 'bold',
  // aparentemente para que escale bien, la col mas larga debe tener
  // no definido el width, pero si el maxwidth
  //width:200, 
  maxWidth: 200,// 
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

function AddProductTable(props) {

  let { state, dispatch } = React.useContext(ContextVenta);

  const handleRowClick = async (selectedRow) => {
    dispatch({ type: "clickRowSelection", payload: selectedRow })
    props.inputQuantity.current.focus()
  }

  return (
    <div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
      <MaterialTable
        icons={tableIcons}
        data={state.searchProducts.data}
        columns={columns}
        onRowClick={((evt, selectedRow) => handleRowClick(selectedRow))}
        options={{
          actionsColumnIndex: -1, debounceInterval: 500, pageSize: 13,
          pageSizeOptions: [], showTitle: true, toolbarButtonAlignment: 'left',
          paging: false,
          toolbar: false,
          //change background if index match with rowData
          rowStyle: rowData => ({
            backgroundColor: (state.selectedProduct.index === state.searchProducts.data.indexOf(rowData)) ? '#90caf9' : '#FFF'
          })
        }}
        components={{
          Container: props => <div {...props} />
        }}
        localization={localizationMT}
      />
    </div>
  )
}

export default AddProductTable