import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 220;  //240

const toolbarHeight = 50;

const inputHeight = 40
const buttonHeight = 45

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // deleted, used in carrito:
    //width: '100%',
    //marginTop: theme.spacing(3),
    overflowY: 'auto',
    height: '100vh', // IMPORTANTE
    flex: '1 0 auto',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    //padding: 0,
    marginTop: 0,
    height: 50
  },
  drawer: {
    height:'100%',
    display:'flex',
    flexDirection:'column',


    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: { minHeight: toolbarHeight },//theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },

  boton_icono_izquierda: {
    margin: theme.spacing(1),
  },

  icono_izquierda: {
    marginRight: theme.spacing(1),
  },
  //***************************************
  // VENTA
  //***************************************
  root_venta: {
    flexGrow: 1,
    overflowY: 'auto',
    height: `calc(100% - ${toolbarHeight}px)`, // content cant have this bcse has the toolbar
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',// almost equals to '50% 50%',
    gridTemplateRows: 'minmax(0, 1fr)', // almost equal to '100%',
    gridGap: theme.spacing(2)
  },

  paper_venta_carrito: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: `${inputHeight}px auto 120px ${buttonHeight}px`,
    gridGap: theme.spacing(2)
  },

  div_create_sale: {
    //padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'minmax(0, 1fr)',
    gridGap: theme.spacing(3),
    height: '100%'
  },

  div_green_100: {
    width: '100%',
    height: '100%',
    background: 'green'
  },
  paper_venta_agregar_productos: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },

  div_add_product: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: `${inputHeight}px ${inputHeight}px minmax(0, 1fr) ${buttonHeight}px`,
    gridGap: theme.spacing(2),
    height: '100%'
  },
  div_search_header: {
    //background: 'green',
    display: 'grid',
    gridTemplateColumns: '1fr 70px 100px 40px',
    gridTemplateRows: 'minmax(0, 1fr)',
    gridGap: theme.spacing(2),
    height: '100%'
  },


  //***************************************
  // LISTA PRODUCTOS
  //***************************************
  root_listaProductos: { //LAUTARO ACA
    flexGrow: 1,
    overflowY: 'auto',
    height: `calc(100% - ${toolbarHeight}px)`, // content cant have this bcse has the toolbar
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',// almost equals to '50% 50%',
    gridTemplateRows: 'minmax(0, 1fr)', // almost equal to '100%',
    gridGap: theme.spacing(2)
  },

  paper_listaProductos: { //LAUTARO ACA
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: `60px minmax(0, 1fr) ${inputHeight}px`,
    gridGap: theme.spacing(2),
    height: `100%`
  },

  div_search_add: {
    //background: 'green',
    display: 'grid',
    gridTemplateColumns: '1fr 70px',
    gridTemplateRows: 'minmax(0, 1fr)',
    gridGap: theme.spacing(2),
    height: '100%'
  },


  //***************************************
  // LISTA ventas
  //***************************************
  root_listaVentas: { //LAUTARO ACA
    flexGrow: 1,
    overflowY: 'auto',
    height: `calc(100% - ${toolbarHeight}px)`,
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',// almost equals to '50% 50%',
    gridTemplateRows: 'minmax(0, 1fr)', // almost equal to '100%',
    gridGap: theme.spacing(2)
  },

  paper_listaVentas: { //LAUTARO ACA
    //background: 'green',
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: `70px minmax(0, 1fr) ${inputHeight}px`,
    gridGap: theme.spacing(0),
    //height: `100%`,
    //overflowY: 'auto',
  },
  div_select_dates: {
    //background: 'green',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'minmax(0, 1fr)',
    gridGap: theme.spacing(10),
    height: '100%'
  },

  //***************************************
  // Actualizacion Precios
  //***************************************

  root_actualizacionPrecios: { //LAUTARO ACA
    flexGrow: 1,
    overflowY: 'auto',
    height: `calc(100% - ${toolbarHeight}px)`,
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',// almost equals to '50% 50%',
    gridTemplateRows: 'minmax(0, 1fr)', // almost equal to '100%',
    gridGap: theme.spacing(2)
  },

  paper_actualizacionPrecios: { //LAUTARO ACA
    //background: 'green',
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: `50px minmax(0, 1fr) ${inputHeight}px`,
    gridGap: theme.spacing(0),
    //height: `100%`,
    //overflowY: 'auto',
  },

  articlesProv: { //LAUTARO ACA
    //background: 'green',
    //padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gridTemplateRows: `minmax(0, 1fr)`,
    gridGap: theme.spacing(2),
    //height: `100%`,
    //overflowY: 'auto',
  },
  div_imgProv: {
    height: '100%'
  },
  imgProv: {
    height: '100%'
  },
 //***************************************
  // Backups
  //***************************************
  root_backups: { //LAUTARO ACA
    flexGrow: 1,
    overflowY: 'auto',
    height: `calc(100% - ${toolbarHeight}px)`,
    padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',// almost equals to '50% 50%',
    gridTemplateRows: 'minmax(0, 1fr)', // almost equal to '100%',
    gridGap: theme.spacing(2)
  },

  paper_backups: { //LAUTARO ACA
    //background: 'green',
    //padding: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: `50px minmax(0, 1fr)`,
    gridGap: theme.spacing(2),
    //height: `100%`,
    //overflowY: 'auto',
  },
  content_backups: { //LAUTARO ACA
    //background: 'green',
    //padding: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',// almost equals to '50% 50%',
    gridTemplateRows: 'minmax(0, 1fr)', // almost equal to '100%',
    gridGap: theme.spacing(2)
    //height: `100%`,
    //overflowY: 'auto',
  },

  content_dobackups: { //LAUTARO ACA
    //background: 'green',
    //padding: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',// almost equals to '50% 50%',
    gridTemplateRows: `minmax(0, 1fr) ${inputHeight}px`, // almost equal to '100%',
    gridGap: theme.spacing(2)
    //height: `100%`,
    //overflowY: 'auto',
  },

})
);

export default useStyles

