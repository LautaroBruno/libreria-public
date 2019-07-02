import React from 'react'
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getServersBackups, restoreDataBase } from '../../DataFetcher/backups'

import useStyles from '../Common/styles'
/*
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import gql from 'graphql-tag'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const apolloClient =
  new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: 'http://localhost:4000' }),
    defaultOptions: defaultOptions,
  })

const UPLOAD_ARTICLES = gql`
  mutation uploadFile($file: Upload!) {
    uploadArticles(file: $file) {
        created
        updated
        review
        skipped
        errors
    }
  }
`;
*/

const RestoreFromServer = () => {
  const classes = useStyles();
  const [step, setStep] = React.useState('pickFile');
  const [file, setFile] = React.useState(null);


  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [result, setResult] = React.useState(false);

  const TableBackups = (props) => {

    const handleButton = () => {
      setStep('inform')
      restoreBackup()
    }

    const restoreBackup = async () => {
      setIsLoading(true)
      setError(false)
      try {
        let result = await restoreDataBase('')
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

    return (
      <div className={classes.content_dobackups}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h3>Seleccionar Archivo para Restaurar Base de Datos</h3>
          <input
            type="file"
            accept=".backup"
            required
            onChange={async ({ target: { validity, files: [file] } }) => {
              // validity.valid es un checker de que el archivo este correcto
              if (validity.valid) {
                setFile(file)
              }
            }
            }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button variant="contained" color="primary" onClick={handleButton} disabled={!file}>Restaurar Backup</Button>
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
      case "pickFile":
        return <div>codeame</div>
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