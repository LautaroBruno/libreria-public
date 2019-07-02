import React from 'react';

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

const UPLOAD_BOOKS = gql`
  mutation uploadFile($file: Upload!) {
    uploadBooks(file: $file) {
        created
        updated
        review
        skipped
        errors
    }
  }
`;


let ContextAP = React.createContext();

function getSteps() {
  return ['Seleccion de Proveedor', 'Seleccion de Archivo', 'Carga e Informe'];
}

function ContextAPProvider(props) {

  const [activeStep, setActiveStep] = React.useState(0);
  const [provider, setProvider] = React.useState('articulos');
  const [fileToUpload, setFileToUpload] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [result, setResult] = React.useState(false);

  const uploadFile = async () => {
    // set loading Before API operation starts
    setIsLoading(true);
    setError(false);
    let mutation = ''
    if (provider === 'articulos') mutation = UPLOAD_ARTICLES
    if (provider === 'libros') mutation = UPLOAD_BOOKS
    try {
      let result = await apolloClient.mutate({
        mutation: mutation,
        variables: { file: fileToUpload },
      })
      console.log(result)
      if (provider === 'articulos') setResult(result.data.uploadArticles);
      if (provider === 'libros') setResult(result.data.uploadBooks)
    }
    catch (error) {
      setError(true);
    }
    // After API operation end
    setIsLoading(false);
  }


  let value = {
    activeStep, setActiveStep, getSteps, provider, setProvider, fileToUpload, setFileToUpload,
    isLoading, error, result, uploadFile
  };

  return (
    <ContextAP.Provider value={value}>{props.children}</ContextAP.Provider>
  );
}

export { ContextAP, ContextAPProvider };