import React from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import DrawerLibreria from './Components';
import { SnackbarProvider } from 'notistack';
import { ContextAPProvider } from "./Components/ActualizacionPrecios/ContextAP";


import theme from "./theme";
function App() {
  return (
    <ContextAPProvider>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <SnackbarProvider
            maxSnack={5}
            autoHideDuration={2500}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <DrawerLibreria />
          </SnackbarProvider>
        </div>
      </MuiThemeProvider>
    </ContextAPProvider>

  );
}

export default App;
