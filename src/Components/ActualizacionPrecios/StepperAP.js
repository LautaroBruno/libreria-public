import React from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { ContextAP } from "./ContextAP";

const StepperAP = () => {
  let { activeStep, getSteps } = React.useContext(ContextAP);

  const steps = getSteps()

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  )
}
export default StepperAP;