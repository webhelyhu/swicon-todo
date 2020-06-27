import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const blue = '#0B72B9'
const orange = '#FFBA60'


export default createMuiTheme({
  palette: {
    common: {
      blue,
      orange,
    },
    primary: {
      main: blue
    },
    secondary: {
      main: orange
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1rem",
      textTransform: "none",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white"
    }
  }
})

