import React from 'react'

import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import ArticlesProvider from './ArticlesProvider'

import BooksProvider from './BooksProvider'

import { ContextAP } from "./ContextAP";

const getProviderContent = (provider) => {
  switch (provider) {
    case 'articulos':
    default:
      return <ArticlesProvider />
    case 'libros':
      return <BooksProvider />
  }
}

const StepProviderSelector = () => {
  let { setFileToUpload, getSteps, provider, setProvider } = React.useContext(ContextAP);

  setFileToUpload(null) // al volver atras resetea el fileToUpload
  function handleChange(e) {
    setProvider(e.target.value)

  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: `40px minmax(0, 1fr)`, gridGap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Seleccionar Proveedor: </h2>
        <div style={{ width: 10 }}></div>

        <FormControl style={{ width: 200 }}>
          <Select
            value={provider}
            onChange={handleChange}
            displayEmpty
            name="age"
          >
            <MenuItem value={'articulos'}>Articulos</MenuItem>
            <MenuItem value={'libros'}>Libros</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ height: '100%', overflowY: 'auto' }}>
        {getProviderContent(provider)}
      </div>
    </div>
  )
}
export default StepProviderSelector;