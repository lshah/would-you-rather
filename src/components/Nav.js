import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar,
    Drawer, ListItem, List,  } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    menu: {
        '& .MuiDrawer-paper': {
            width: '20rem',
            background: '#3f51b5',
            '& .MuiList-root': {
                margin: '2rem',
                '& a': {
                    color: 'white',
                },
            },
        },
    },
    navLinksContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        float: 'left',
        '& a': {
            color: 'white',
            paddingRight: '2rem',
        },
    },
    navProfileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

function Nav({ authedUser, users }) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
            <NavLink to="/" exact>
                Home
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/add" exact>
                New Question
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/leader-board" exact>
                Leader Board
            </NavLink>
        </ListItem>
      </List>
    </div>
  );

    return (
        <div>
            <AppBar>
              <Toolbar className={classes.toolbar}>
                {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button color="inherit" onClick={toggleDrawer(anchor, true)}>Menu</Button>
                <Drawer className={classes.menu} anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}
                <div className={classes.navProfileContainer}>
                <Typography variant="body1" className={classes.title}>
                    Hello, {authedUser ? users[authedUser].name : ''}
                </Typography>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                <Avatar alt="user avatar" src={users[authedUser].avatarURL} className={classes.large} />
                </IconButton>
                <Button color="inherit" href="/">
                    Logout
                </Button>
            </div>
        </Toolbar>
      </AppBar>
            </div>
    )
}

function mapStateToProps ({authedUser, users}) {
    return {
        authedUser,
        users,
    }
}

export default connect(mapStateToProps)(Nav);