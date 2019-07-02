
import React from 'react'
import Paper from '@material-ui/core/Paper';

import TablePagination from '@material-ui/core/TablePagination';

import RealTable from './realTable'

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import useStyles from '../Common/styles'

import MomentUtils from "@date-io/moment";
import 'moment/locale/es';

const DF = require('../../DataFetcher/sells')

const ActualDate = new Date()
const startDateActual = new Date(ActualDate.getFullYear(), ActualDate.getMonth(), 1)

function ListaVentas(props) {
  const [startDate, setStartDate] = React.useState(startDateActual)
  const [endDate, setEndDate] = React.useState(ActualDate)
  const [pagination, setPagination] = React.useState({
    rowsPerPage: 8,
    page: 0,
  })
  const [count, setCount] = React.useState(0)
  const [data, setData] = React.useState()
  const [updateme, setupdateme] = React.useState(false)


  const classes = useStyles();

  const dateToStringCallEnd = () => {
    let day = endDate.getDate()
    if (day <= 10) {
      day = `0${day}`
    }
    let month = (endDate.getMonth() + 1)
    if (month <= 10) {
      month = `0${month}`
    }
    const year = endDate.getFullYear()
    return (`${year}-${month}-${day} 23:59:59`)
  }



  const dateToStringCallStart = () => {

    let day = startDate.getDate()
    if (day <= 10) {
      day = `0${day}`
    }

    let month = (startDate.getMonth() + 1)

    if (month <= 10) {
      month = `0${month}`
    }
    const year = startDate.getFullYear()

    return (`${year}-${month}-${day} 00:00:00`)
  }


  const dateToStringPrint = data => {
    data.data.getAllSale.sales.forEach(sell => {
      const newDate = new Date(parseInt(sell.createdAt))

      let day = newDate.getDate()
      if (day <= 10) {
        day = `0${day}`
      }
      let month = (newDate.getMonth() + 1)
      if (month <= 10) {
        month = `0${month}`
      }
      const year = newDate.getFullYear()
      sell.createdAt = `${day}-${month}-${year}`
    });

  }


  React.useEffect(() => {
    const fetchData = async () => {
      let result = await DF.default.getAllSales(pagination.page + 1, pagination.rowsPerPage, dateToStringCallStart(), dateToStringCallEnd())
      setCount(result.data.getAllSale.pagination.totalDocs)
      dateToStringPrint(result)
      setData(result.data.getAllSale.sales)
    };

    fetchData()
  }, [startDate, endDate]);


  React.useEffect(() => {
    const fetchData = async () => {
      let result = await DF.default.getAllSales(pagination.page + 1, pagination.rowsPerPage, dateToStringCallStart(), dateToStringCallEnd())
      setCount(result.data.getAllSale.pagination.totalDocs)
      dateToStringPrint(result)
      setData(result.data.getAllSale.sales)
    };

    fetchData()
  }, [pagination, updateme]);



  const handleChangePage = (e, newPage) => {
    setPagination({ ...pagination, page: newPage })
  }

  // IMPORTANTE MOMENT -> DATE
  const momentToDate = (date) => {
    if (date._isAMomentObject) {
      return date.toDate();
    }
    return date
  }

  const actStartDate = date => {
    setPagination({ ...pagination, page: 0 })
    console.log('pag0 start')
    setStartDate(momentToDate(date))
  }

  const actEndDate = date => {
    setPagination({ ...pagination, page: 0 })
    console.log('pag0')
    setEndDate(momentToDate(date))
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={'es'} >
      <div className={classes.root_listaVentas}>
        <Paper className={classes.paper_listaVentas}>
          <div className={classes.div_select_dates} >
            <DatePicker
              format="DD/MM/YYYY"
              margin="normal"
              id="mui-pickers-date"
              label="Desde"
              disableFuture={true}
              value={startDate}
              cancelLabel={false}
              maxDate={endDate}
              okLabel={false}
              autoOk={true}
              onChange={date => actStartDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <DatePicker
              format="DD/MM/YYYY"
              margin="normal"
              id="mui-pickers-date"
              label="Hasta"
              disableFuture={true}
              cancelLabel={false}
              minDate={startDate}
              okLabel={false}
              autoOk={true}
              value={endDate}
              onChange={date => actEndDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <div style={{ height: '100%', overflowY: 'auto', flexGrow: 1 }}>
            <RealTable data={data} updateme={[updateme, setupdateme]} />
          </div>
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
            />
          </div>

        </Paper>

      </div>
    </MuiPickersUtilsProvider>
  )
}
export default ListaVentas;