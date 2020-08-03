import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { 
    Card, CardContent, CardActions, Button, Typography, Avatar
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        paddingTop: '2rem',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
          },
    },
    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
          },
        '& .MuiAvatar-root': {
            height: '6rem',
            width: '6rem',
        },
        '& .MuiCardContent-root': {
            margin: '1rem',
            width: '16rem',
            textAlign: 'center',
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left',
              },
        },
        '& button': {
            width: '16rem',
        },
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1rem',
    },
    authorAsks: {
        background: 'rgb(239, 241, 251)',
        height: '30px',
        color: '#303f9f',
        marginTop: 0,
        fontWeight: 'bold',
        padding: '0.6rem',
    },
  }));

const Question = ({question, users, id}) => {
    const classes = useStyles();
    const { optionOne } = question
    if(!question) {
        return <Redirect to='/404'/>
    } else {
        return (
            <div className={classes.container}>
                <Card className={classes.root} variant="outlined">
                    <Typography className={classes.authorAsks} variant="h6" component="h2">
                        {users[question.author].name} asks:
                    </Typography>
                    <div className={classes.contentRoot}>
                        <Avatar alt="user avatar" src={users[question.author].avatarURL} className={classes.large} />
                        <div className={classes.contentContainer}>
                            <CardContent>                        
                                <Typography variant="h6" component="h3">
                                    Would you rather
                                </Typography>
                                <Typography component="h4">
                                    {optionOne.text}
                                </Typography>
                            </CardContent>
                        
                            <CardActions>
                                <Link to={`/questions/${id}`}>
                                    <Button variant="contained" to={`/questions/${id}`} color="primary">View Poll</Button>
                                </Link>
                            </CardActions>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
    
}

const mapStateToProps = ({ questions, users }, {id}) => {
    const question = questions[id];
    return {
        question,
        users,
    }
}

export default connect(mapStateToProps)(Question);
