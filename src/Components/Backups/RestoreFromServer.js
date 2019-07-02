import React from 'react'
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getServersBackups,restoreDataBase } from '../../DataFetcher/backups'

import useStyles from '../Common/styles'


const RestoreFromServer = () => {
  const classes = useStyles();
  const [step, setStep] = React.useState('backupServerList');
  const [data, setData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [result, setResult] = React.useState(false);


  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getServersBackups()
      let arrayResults = result.data.quetionDataBase

      let parsedResults = arrayResults.map(
        (backup) => {
          const splitted = backup.split('.')
          const dateSplitted = splitted[0].split('-')
          const date = `${dateSplitted[2]}-${dateSplitted[1].padStart(2,"0")}-${dateSplitted[0]}`

          return { name: backup, date: date, id: splitted[1], description: splitted[2] }
        }
      )
      setData(parsedResults)
    };

    fetchData()

  }, []);



  const TableBackups = (props) => {

    const [selected, setSelected] = React.useState(null);
    //let selected = null

    const handleButton = () =>{
      setStep('inform')
      restoreBackup()
    }
    const handleRowClick = (selectedRow)=>{
      setSelected(selectedRow)
      //selected = selectedRow
    }

    const restoreBackup = async () => {
      setIsLoading(true)
      setError(false)
      try {
        let result = await restoreDataBase(selected.name)
        setResult(result)
      }
      catch (error) {
        setError(true)
      }
      finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      }
    }

    const columns = [
      {
        title: 'Fecha', field: 'date', sorting: false, editable: 'never',
        //cellStyle: fixWidth, headerStyle: fixWidth,
      },
      {
        title: 'Identificacion', field: 'id', sorting: false,
        //cellStyle: fixWidth, headerStyle: fixWidth, sorting: false
      },
      {
        title: 'Descripcion', field: 'description', sorting: false, editable: 'never',
        //cellStyle: fixWidthOverFlow, headerStyle: fixWidthOverFlow
      },
    ]
    return (
      <div className={classes.content_dobackups}>
        <MaterialTable
           style={{ height: '100%', width: '100%', overflowY:'auto'}}
          //icons={tableIcons}
          data={props.data}
          columns={columns}
          options={{
            pageSizeOptions: [], showTitle: true, toolbarButtonAlignment: 'left',
            paging: false,
            toolbar: false,
            rowStyle: rowData => ({
              backgroundColor: (rowData === selected) ? '#90caf9' : '#FFF'
            })
          }}
          components={{
            Container: props => <div {...props} />
          }}
          onRowClick={((evt, selectedRow) => handleRowClick(selectedRow))}
        //localization={{ ...localizationMT, body: { ...localizationMT.body, emptyDataSourceMessage: 'No hay productos agregados' } }}

        />
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button variant="contained" color="primary" onClick={handleButton} disabled={!selected}>Restaurar Backup</Button>
        </div>
      </div>
    )
  }

  const Inform = (props) => {
    const handleButton = () => {
      setStep('backupServerList')
    }

    const renderMe = () => {
      if (error) {
        return <div>Algo malo ha ocurrido</div>
      }
      if (isLoading) {
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h3>Restaurando Base de Datos</h3>
            <h4>Por favor espere...</h4>
            <CircularProgress />
          </div>
        )
      }

      if (!isLoading && !error) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Resultado de la Restauracion de Backup</h3>
            <span>Se restauro el backup correctamente</span>

          </div>

        )
      }
    }

    return (
      <div className={classes.content_dobackups}>
        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {renderMe()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button variant="contained" color="primary" onClick={handleButton}> Finalizar</Button>
        </div>
      </div>
    )

  }


  const getContent = () => {
    switch (step) {
      case "backupServerList":
        return <TableBackups data={data} />
      case "inform":
        return <Inform />
      default:
        return <div>something bad happen</div>
    }
  }

  return (
    getContent()
  )
}
export default RestoreFromServer;