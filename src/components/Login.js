import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, MenuItem, AppBar } from '@material-ui/core';
import { setAuthedUser, handleSetAuthedUser } from '../actions/authedUser';

const useStyles = makeStyles((theme) => ({
    appBar: {
        height: '4rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        height: '100vh',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '450px',
          },
    },
    title: {
        marginTop: '-4rem',
    },
    subTitle: {
        marginTop: '2rem',
        color: 'red',
    },
    inputField: {
        marginTop: '2rem',
        width: '20rem',
        [theme.breakpoints.up('sm')]: {
            width: '25rem',
          },
    },
    loginBtn: {
        marginTop: '2rem',
        width: '20rem',
        [theme.breakpoints.up('sm')]: {
            width: '25rem',
          },
    },
  }));

const Login= ({authedUser, users}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = React.useState('');
    const [warning, setWarning] = React.useState(false);
    
    const handleChange = (event) => {
        setSelectedUser(event.target.value);
        setWarning(false);
    };

    const handleLogin = () => {
        if (selectedUser !== "") {
            setWarning(false);
            dispatch(handleSetAuthedUser(selectedUser));
        } else {
            setWarning(true);
        }
        
    }

    return (
        <>
            <AppBar className={classes.appBar}>
                <Typography variant="body1">
                    ReactND Project 4 Would you rather
                </Typography>
            </AppBar>
            <div className={classes.root}>
                <Typography component="h1" variant="h3" className={classes.title}>
                    Sign In
                </Typography>
                {warning && 
                <Typography variant="body1" className={classes.subTitle}>
                    Please select a user from the dropdown to login
                </Typography>
                }
                <form className={classes.form} autoComplete="off">
                    <TextField
                        select
                        className={classes.inputField}
                        label="Select User"
                        value={selectedUser}
                        onChange={handleChange}
                        variant="outlined"
                        >
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" className={classes.loginBtn} onClick={handleLogin}>Login</Button>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser,
        users: Object.values(users),
    }

}

export default connect(mapStateToProps, { setAuthedUser })(Login);