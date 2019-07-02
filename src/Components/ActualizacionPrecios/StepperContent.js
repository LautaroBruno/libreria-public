import React from 'react'

import StepProviderSelector from './StepProviderSelector'
import FilePicker from './FilePicker'
import Inform from './Inform'

import { ContextAP } from "./ContextAP";

const getContent = (activeStep)=>{
  switch(activeStep){
    case 0:
      return <StepProviderSelector/>
    case 1:
      return <FilePicker/>
    case 2:
      return <Inform/>
    default:
      return <div>something bad happen</div>
  }
}

const StepperContent = () => {
  let { activeStep} = React.useContext(ContextAP);

  return (
    <div>
      {getContent(activeStep)}
    </div>
  )
}
export default StepperContent;