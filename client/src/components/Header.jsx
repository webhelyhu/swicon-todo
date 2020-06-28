import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthToken, useSetAuthToken } from "../context/auth"

import AppBar from "@material-ui/core/AppBar"
import { Toolbar } from "@material-ui/core"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/styles/makeStyles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"
// import Menu from "@material-ui/core/Menu"
// import MenuItem from "@material-ui/core/MenuItem"

import logo from "../assets/logo2.svg"

function ElevationScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })
  return React.cloneElement(children, {
    elevation: trigger ? 10 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logoContainer: {
    margin: 0,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "7em",
    minWidth: "24em",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "1.4em",
    marginLeft: "50px",
    marginRight: "25px",
    paddingLeft: "25px",
    paddingRight: "25px",
    minHeight: "45px",
  },
}))

const Header = (props) => {
  const authToken = useAuthToken()
  const setAuthToken = useSetAuthToken()

  const classes = useStyles()
  const [value, setValue] = useState(0) // tabs stop value -- which is active?

  const handleChange = (event, value) => setValue(value)

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  //   setOpen(false)
  // }

  useEffect(() => {
    //
    // find a way to show which page we are currently on
    //
    // the old way:
    //
    // const currLocation = window.location.pathname
    // let currPosition = menuBar.findIndex((e) => e[1] === currLocation)
    // if (currPosition !== value && currPosition !== -1) setValue(currPosition)
  }, [value])

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              disableRipple
            >
              <img src={logo} alt="Todo" className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary" // hiding the underline
            >
              <Tab
                className={classes.tab}
                label="Add User"
                component={Link}
                to="/adduser"
              />
              <Tab
                className={classes.tab}
                label="Todos"
                component={Link}
                to="/todos"
              />
              {!authToken && (
                <Tab
                  className={classes.tab}
                  label="Login"
                  component={Link}
                  to="/login"
                />
              )}
              <Tab
                className={classes.tab}
                label="About"
                component={Link}
                to="/about"
              />
              <Tab
                className={classes.tab}
                label="Health"
                component={Link}
                to="/healthcheck"
              />
            </Tabs>
            {authToken && (
              <Button
                onClick={() => setAuthToken("")}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}>
        <Typography variant="h3" color="secondary">
          Toolbar
        </Typography>
      </div>
    </React.Fragment>
  )
}

export default Header
