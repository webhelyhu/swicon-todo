import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
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

import { useAuthToken, useSetAuthToken } from "../context/auth"
import logo from "../assets/logo2.svg"

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
  loginTab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    marginRight: "28px",
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

const menuMap = new Map([
  ["/adduser", 0],
  ["/todos", 1],
  ["/profile", 2],
  ["/healthcheck", 2],
  ["/login", 3],
])

const ElevationScroll = (props) => {
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

const Header = (props) => {
  const authToken = useAuthToken()
  const setAuthToken = useSetAuthToken()
  const classes = useStyles()
  let { pathname } = useLocation()

  const [activeMenu, setActiveMenu] = useState(false)
  const activeMenuSwitch = (event, value) => setActiveMenu(value)

  // effect to re-set the active menu in Header, if needed.
  useEffect(() => {
    // console.log("Location has changed. pathname:", pathname)
    if (menuMap.has(pathname)) {
      if (menuMap.get(pathname) !== activeMenu) {
        setActiveMenu(menuMap.get(pathname))
      }
    } else {
      // console.log("on a path without a menuItem: ", pathname)
      setActiveMenu(false)
    }
  }, [pathname, activeMenu])

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
              <img src={logo} alt="Three Layer Todo" className={classes.logo} />
            </Button>
            <Tabs
              value={activeMenu}
              onChange={activeMenuSwitch}
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
              {authToken ? (
                <Tab
                  className={classes.tab}
                  label="Profile"
                  component={Link}
                  to="/profile"
                />
              ) : (
                <Tab
                  className={classes.tab}
                  label="Healthcheck"
                  component={Link}
                  to="/healthcheck"
                />
              )}
              {!authToken && (
                <Tab
                  className={classes.loginTab}
                  label="Login"
                  component={Link}
                  to="/login"
                />
              )}
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
