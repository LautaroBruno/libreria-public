import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { backupDataBase } from '../../DataFetcher/backups'

import useStyles from '../Common/styles'


const Backups = () => {
  const classes = useStyles();
  const [step, setStep] = React.useState('putName');

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [result, setResult] = React.useState(false);


  const PutName = (props) => {
    const [name, setName] = React.useState('');
    const handleOnChange = (e) => {
      if (e.target.value.length < 20) setName(e.target.value)
    }
    const handleButton = async () => {
      setStep('inform')
      createBackup()
    }

    const createBackup = async () => {

      setIsLoading(true)
      setError(false)

      try {
        let result = await backupDataBase(name)
        setResult(result.data.backupDataBase)

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

    return (
      <div className={classes.content_dobackups}>
        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            autoFocus
            value={name}
            label="Ej: Manual"
            onChange={handleOnChange}
            helperText={'Nombre para el Backup'}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button variant="contained" color="primary" onClick={handleButton}> Crear Backup</Button>
        </div>
      </div>
    )

  }

  const Inform = (props) => {
    const handleButton = () => {
      setStep('putName')
    }

    const renderMe = () => {
      if (error) {
        return <div>Algo malo ha ocurrido</div>
      }
      if (isLoading) {
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h3>Creando Backup de Base de Datos</h3>
            <h4>Por favor espere...</h4>
            <CircularProgress />
          </div>
        )
      }

      if (!isLoading && !error) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Resultado de Creacion de Backup</h3>
            <span>Se creo el backup correctamente</span>

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
      case "putName":
        return <PutName />
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
export default Backups;
//<AppBar position="static">
//</AppBar>