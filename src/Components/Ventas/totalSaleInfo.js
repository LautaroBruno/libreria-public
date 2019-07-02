import React from 'react'
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { ContextVenta } from "./contexVentas";

function TotalSaleInfo(props) {
  let { state } = React.useContext(ContextVenta); //, dispatch
  const variantT = "button"

  const style = {
    height: 35,
    paddingTop: 0,
    paddingBottom: 0,
  }
  return (
    <Table style={{
      width: '60%',
    }}>
      <TableBody>
        <TableRow style={style}>
          <TableCell style={style}>
            <Typography variant={variantT}>
              Subtotal
            </Typography>
          </TableCell>
          <TableCell align="left" style={style}>
            <Typography variant={variantT}>
              {`$ ${state.subTotalSale}`}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow style={style}>
          <TableCell style={style}>
            <Typography variant={variantT}>
              Descuentos
            </Typography>
          </TableCell>
          <TableCell align="left" style={style}>
            <Typography variant={variantT}>
              {`$ ${state.discountSale}`}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow style={style}>
          <TableCell style={style}>
            <Typography variant={variantT}>
              TOTAL
            </Typography>
          </TableCell>
          <TableCell align="left" style={style}>
            <Typography variant={variantT}>
              {`$ ${state.totalSale}`}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default withSnackbar(TotalSaleInfo)