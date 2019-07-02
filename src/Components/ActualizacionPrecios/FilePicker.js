import React from 'react'

import { ContextAP } from "./ContextAP";

const FilePicker = () => {
  let { setFileToUpload, provider } = React.useContext(ContextAP);

  const label = provider === 'articulos' ? 'Articulos' : 'Libros'

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h3>Seleccionar Archivo para {label}</h3>
      <input
        type="file"
        accept=".xls,.xlsx"
        required
        onChange={async ({ target: { validity, files: [file] } }) => {

          // validity.valid es un checker de que el archivo este correcto
          if (validity.valid) {
            setFileToUpload(file)
          }
        }
        }
      />
    </div>
  )
}
export default FilePicker;