import React from 'react'

import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useStyles from '../Common/styles'

import DoBackup from './DoBackup'
import RestoreFromServer from './RestoreFromServer'

const getContent = (value)=>{
  switch(value){
    case "doBackup":
      return <DoBackup/>
    case "restoreFromServer":
      return <RestoreFromServer />
    case "restoreFromFile":
      return <div>restoreFromFile</div>
    default:
      return <div>something bad happen</div>
  }
}

const Backups = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('doBackup');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root_backups}>
      <Paper className={classes.paper_backups}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange}>
            <Tab value="doBackup" label="Realizar Backup" />
            <Tab value="restoreFromServer" label="Restaurar desde Servidor" />
            {
            //<Tab value="restoreFromFile" label="Restaurar desde archivo" />
            }
          </Tabs>
        </AppBar>
        <div className={classes.content_backups}>
        {getContent(value)}
        </div>

      </Paper>
    </div>
  )
}
export default Backups;
//<AppBar position="static">
//</AppBar>