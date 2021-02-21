import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
  Tabs,
  Tab
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const classes = useStyles();

  const user = useSelector((store) => store.user);

  const history = useHistory();

  const tabNameToIndex = {
    0: "patch-view/0",
    1: "patch-edit/0",
    2: "patch-manager",
    3: "about"
  };


  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`)
    setSelectedTab(newValue)
  }

  return (
    <div className="classes.root">
      <AppBar position="static" color="primary">
        <Button>
            <Typography variant="h4" className="classes.title">Modular Memory</Typography>
          <Link to="/patch-view/0">
          </Link>
        </Button>
        {user.id && (

          <Tabs value={selectedTab} onChange={handleTabChange} >

          <Tab label="Patch View" />
          <Tab label="Patch Edit" />
          <Tab label="Patch Manager" />
          <Tab label="About" />

          {user.id && (
            <>
              <LogOutButton className="navLink" />
            </>
          )}

        </Tabs>
      )}
      </AppBar>
    </div>
  );
}

export default Nav;
