import React, { useEffect, useState } from 'react';
import { ContextVenta } from "./contexVentas";
import Badge from '@material-ui/core/Badge';


function BadgeVentas(props) {

  let { state } = React.useContext(ContextVenta);

  const badge = () => {
    return <Badge color="primary" badgeContent={state.actualSale.length} />
  }

  const renderMe = () => {
    if (state.actualSale.length > 0 && props.activeOp !== 'Venta')
      return badge()
    return <div></div>
  }


  return (
    <div style={{ paddingRight: 50, paddingBottom: 2 }}>
      {renderMe()}
    </div>

  )

}

export default BadgeVentas