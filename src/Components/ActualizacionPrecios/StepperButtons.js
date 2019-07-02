import React from 'react'
import Button from '@material-ui/core/Button';

import { ContextAP } from "./ContextAP";

const StepperButtons = () => {
  let { activeStep, setActiveStep, getSteps, fileToUpload, uploadFile } = React.useContext(ContextAP);

  const steps = getSteps()

  function handleNext() {
    if (activeStep < steps.length - 1) {
      if (activeStep === 1) {
        uploadFile()
      }
      setActiveStep(prevActiveStep => prevActiveStep + 1);

    }
    else
      setActiveStep(0)
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>

      <Button
        disabled={activeStep === 1 && fileToUpload === null}
        onClick={handleNext} variant="contained"
        color="primary">
        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
      </Button>
      <div style={{ width: 10 }}></div>

      <Button onClick={handleBack} disabled={activeStep === 0 || activeStep === steps.length - 1} color="primary">
        Atras
      </Button>

    </div>
  )
}
export default StepperButtons;