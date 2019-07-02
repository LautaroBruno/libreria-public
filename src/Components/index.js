import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListIcon from '@material-ui/icons/List'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ListaProductos from './ListaProductos';
import ListaVentas from './ListaVentas';
import Ventas from './Ventas';
import Backups from './Backups';
import ActualizacionPrecios from './ActualizacionPrecios';
import Logo from '../Logo.png';

import BadgeVentas from './Ventas/badgeVentas'

import useStyles from './Common/styles'

import { ContextVentaProvider } from "./Ventas/contexVentas";

function DrawerLibreria() {
  const PRICE_UPDATE = 'Actualizar Precios'
  const SALES_LIST = 'Lista de Ventas'
  const PRODUCT_LIST = 'Lista de Productos'
  const SALE = 'Venta'
  const BACKUPS = 'Backups'

  const [activeOp, setActiveOp] = React.useState(SALE)


  const classes = useStyles();

  const handleClick = (selection) => {
    setActiveOp(selection)
  }

  const renderActive = () => {
    switch (activeOp) {
      case PRICE_UPDATE:
        return <ActualizacionPrecios />
      case SALE:
        return <Ventas />
      case SALES_LIST:
        return <ListaVentas />
      case PRODUCT_LIST:
        return <ListaProductos />
      case BACKUPS:
        return <Backups />

      default:
        return <Ventas />
    }
  }

  const handleUserKeyPress = React.useCallback(event => {
    const { key, keyCode } = event;
    if (key === "F1") {
      event.preventDefault() // previene la accion default... es decir no se mueve el cursor
      setActiveOp(SALE)
    }
    if (key === "F2") {
      event.preventDefault() // previene la accion default... es decir no se mueve el cursor
      setActiveOp(PRODUCT_LIST)
    }
    if (key === "F3") {
      event.preventDefault() // previene la accion default... es decir no se mueve el cursor
      setActiveOp(SALES_LIST)
    }

  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);


  return (
    <ContextVentaProvider>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{ margin: 0, paddingBottom: 12 }}>
            <Typography variant="h6" noWrap>
              {activeOp}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >


          <div className={classes.toolbar}>
            <img src={Logo} height="45px" alt='Logo' />
          </div>
          <Divider />
          <List>
            <ListItem button selected={activeOp === SALE ? true : false} onClick={e => handleClick(SALE)} key={'venta'}>
              <ListItemIcon><AttachMoneyIcon /></ListItemIcon>

              <ListItemText primary={'Venta'} />
              <BadgeVentas activeOp={activeOp} />
              <div>{'[F1]'}</div>

            </ListItem>
            <ListItem button selected={activeOp === PRODUCT_LIST ? true : false} onClick={e => handleClick(PRODUCT_LIST)} key={'listaProductos'}>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'Productos'} />

              <div>{'[F2]'}</div>
            </ListItem>
            <ListItem button selected={activeOp === SALES_LIST ? true : false} onClick={e => handleClick(SALES_LIST)} key={'listaVentas'}>
              <ListItemIcon><CreditCardIcon /></ListItemIcon>
              <ListItemText primary={'Lista de Ventas'} />
              <div>{'[F3]'}</div>
            </ListItem>
            <ListItem button selected={activeOp === PRICE_UPDATE ? true : false} onClick={e => handleClick(PRICE_UPDATE)} key={'actPrecios'}>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText primary={'Actualizar Precios'} />
            </ListItem>
          </List>
          <Divider />
          <div style={{ marginTop: 'auto' }}>
            <Divider />
            <ListItem button selected={activeOp === BACKUPS ? true : false} onClick={e => handleClick(BACKUPS)}>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText primary={'Backups'} />
            </ListItem>
          </div>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {renderActive()}
        </main>
      </div>
    </ContextVentaProvider>
  );
}

export default DrawerLibreria;