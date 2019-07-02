import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import { ContextAP } from "./ContextAP";


const Inform = () => {
  let { isLoading, error, result } = React.useContext(ContextAP);
  //setFileToUpload(null)
  const renderMe = () => {
    if (isLoading) {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h3>Actualizando Base de Datos</h3>
          <h4>Por favor espere...</h4>
          <CircularProgress />
        </div>
      )
    }
    if (error) {
      return <div>Algo malo ha ocurrido</div>
    }
    if (!isLoading && !error) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Resultado de Actualizacion</h3>
          <span>Se crearon {result.created} Productos nuevos</span>
          <span>Se actualizaron {result.updated} productos</span>
          <span>Quedaron {result.review} productos con precio $0 (No tienen Margen de Ganancia)</span>
          {result.errors > 0 ? <span>Errores: {result.errors}. Los errores se deben a filas incompletas en la planilla de Excel.
            O bien, si no se crearon ni actualizaron productos, el formato de la planilla es incorrecto</span> : <div />}

        </div>

      )
    }
  }
  return (

    renderMe()

  )
}
export default Inform;