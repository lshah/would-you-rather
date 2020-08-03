import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
  }));

const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h3" component="h1">
                Page Not Found
            </Typography>
            <Link to={`/`}>Back to home</Link>
        </div>
    )
}

export default NotFound;
