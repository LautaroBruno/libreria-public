import React from 'react'

import Paper from '@material-ui/core/Paper';

import useStyles from '../Common/styles'

import StepperAP from './StepperAP'
import StepperButtons from './StepperButtons'
import StepperContent from './StepperContent'

const ActualizacionPrecios = () => {

  const classes = useStyles();

  return (
    <div className={classes.root_actualizacionPrecios}>
      <Paper className={classes.paper_actualizacionPrecios}>
        <StepperAP />
        <StepperContent />
        <StepperButtons />

      </Paper>
    </div>
  )
}
export default ActualizacionPrecios;