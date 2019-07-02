import React from 'react'

import BookImage from '../../libros800400.png';

import useStyles from '../Common/styles'

const BooksProvider = () => {
  const classes = useStyles();

  return (
    <div className={classes.articlesProv}>
      <div className={classes.imgProv}>
        <img style={{ display: 'block', height: '100%', maxWidth: '100%' }} src={BookImage} alt='Logo' />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 'bold' }}>IMPORTANTE</span>
        <span>Columna A: Debe estar VACIA</span>
        <span>Columna B: Debe contener Cod de Barras del articulo</span>
        <span>Columna C: Debe contener CODIGO INTERNO de proveedor</span>
        <span>Columna D: Debe contener la Descripcion del articulo</span>
        <span>Columna E: Debe contener el Precio antiguo (se ignora)</span>
        <span>Columna F: Debe contener el Precio de Proveedor</span>
        <span>Columna G: Aqui se define el Margen de Ganancia (%)</span>
        <span style={{ fontWeight: 'bold' }}>Margen de Ganancia</span>
        <span>- El numero indicado en cada fila, actualizara el margen de ganancia para dicho producto</span>
        <span>- Si un producto no recibe un margen de ganancia para esta carga, tomara el ultimo Margen de Ganancia que haya recibido</span>
        <span>- Si un producto nunca tuvo margen de ganancia, el precio sera $0</span>
        <span>- Un Producto con precio $0 podra mas tarde actualizarse desde Lista Producto.
          Esta actualizacion no afectara a futuro si se provee un margen de ganancia</span>

      </div>

    </div>
  )
}
export default BooksProvider;