import { createMuiTheme } from "@material-ui/core/styles";

const pixelRatio = 1366 / 1920

export default createMuiTheme({
  spacing: 8 * pixelRatio, // default8
  typography: {
    fontSize: 12, // default 14 // 12 //14  * pixelRatio
    htmlFontSize: 16 // default 16
  },
  overrides: {
    MuiInputBase: {
      root: {
        height: 55 * pixelRatio, //30?
      },
      input: {
        padding: 4 //`${8 - 2}px 0 ${8 - 1}px`,
      },
      marginDense: {
        padding: 4 //`${8 - 2}px 0 ${8 - 1}px`,
      },
    },
    MuiInputLabel: {
      outlined: {
        // see comment above on filled.zIndex
        zIndex: 1,
        pointerEvents: 'none',
        transform: 'translate(14px, 20px) scale(1)', //def 14px, 20px
        '&$marginDense': {
          transform: 'translate(14px, 13px) scale(1)', //def 14px, 12px
        },
        '&$shrink': {
          transform: 'translate(14px, -6px) scale(0.75)',
        },
      },
    },/*
    MuiTableRow:{
      root: {
        height:30,
        padding:0,
      },
    },
    MuiTableCell:{
      root: {
        height:30,
        padding:0,
      },
    },*/
  }
});