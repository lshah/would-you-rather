import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, CardContent, CardActions, Button, Typography, TextField,
} from '@material-ui/core';
import Nav from './Nav';
import { handleSaveQuestion } from '../actions/questions';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        padding: '2rem',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
          },
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        alignItems: 'center',
        '& .MuiAvatar-root': {
            height: '6rem',
            width: '6rem',
        },
        '& .MuiCardContent-root': {
            margin: '1rem',
            textAlign: 'center',
            '& .MuiTextField-root': {
                margin: '1rem',
                width: '16rem',
                [theme.breakpoints.up('sm')]: {
                    width: '42rem',
                  },
            },
        },
        '& button': {
            width: '16rem',
            [theme.breakpoints.up('sm')]: {
                    width: '22rem',
                  },
        },
    },
    backLink: {
        color: 'green',
        textAlign: 'left',
        marginTop: '4rem',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
          },
      },
    title: {
        marginBottom: '2rem',
        marginTop: '2rem',
        textAlign: 'center',
    },
  }));

const NewQuestion = ({authedUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleOptionOne = (event) => {
        setOptionOne(event.target.value);
    };

    const handleOptionTwo = (event) => {
        setOptionTwo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser));
        history.push('/');
    }

    return (
        <>
            <Nav />
            <div className={classes.container}>
            <div className={classes.backLink}><Link to={`/`}>Back to home</Link></div>
                <Typography className={classes.title} variant="h3" component="h1">
                    Create New Question
                </Typography>
                <Card className={classes.root} variant="outlined">
                    <Typography variant="h5" component="h2">
                        Would you rather...
                    </Typography>
                    <CardContent>
                        <form className={classes.newQuestion}>                     
                            <TextField id="outlined-basic" placeholder="Option one" label="Option one" variant="outlined" onChange={handleOptionOne} />
                            <Typography>OR</Typography>
                            <TextField id="outlined-basic" placeholder="Option two" label="Option two" variant="outlined" onChange={handleOptionTwo} />
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                    </CardActions>
                </Card>
            </div>
        </>
    )
}

const mapStateToProps = ({authedUser}) => ({
    authedUser,
})

export default connect(mapStateToProps, {handleSaveQuestion})(NewQuestion);
