import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from 'react-redux';
import { 
    Card, CardContent, CardActions, Button, Typography, Avatar,
    Radio, RadioGroup, FormControlLabel,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../actions/users';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
          },
        '& .MuiCardActions-root': {
            flexDirection: 'column',
            '& p': {
                paddingTop: '1rem', 
                fontStyle: 'italic',
                fontSize: '0.9rem',
            },
            '& a': {
                textDecoration: 'none',
            },
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

const Poll = ({question, users, id, authedUserAnswer, qid, authedUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { optionOne, optionTwo } = question;
    const [value, setvalue] = React.useState(authedUserAnswer);
    const handleChange = (event) => {
        if(!authedUserAnswer){setvalue(event.target.value);}
      };
    
    const handleUserVote = (e) => {
        e.preventDefault();       
        if(value !== undefined){
            dispatch(handleSaveQuestionAnswer(authedUser, question.id, value))
            history.push(`/result/${id}`)
        }
    };

    return (
        <div className={classes.container}>
            <Card className={classes.root} variant="outlined">
                <Typography className={classes.authorAsks} variant="h6" component="h2">
                        {users[question.author].name} asks:
                </Typography>
            <div className={classes.contentRoot}>
                <Avatar alt="user avatar" src={users[question.author].avatarURL} className={classes.large} />
                <div className={classes.contentContainer}>
                <form>
                    <CardContent>                        
                        <Typography variant="h6" component="h3">
                            Would you rather
                        </Typography>
                            <RadioGroup aria-label="poll question" name="questions" onChange={handleChange}>
                                <FormControlLabel value="optionOne" checked={(value || authedUserAnswer) === 'optionOne'} label={optionOne.text} control={<Radio />} />
                                <FormControlLabel value="optionTwo" checked={(value || authedUserAnswer) === 'optionTwo'} label={optionTwo.text} control={<Radio />} />
                            </RadioGroup>
                    </CardContent>
                
                    <CardActions>
                    {!authedUserAnswer && <Link onClick={handleUserVote} to={`/result/${id}`}>
                        <Button variant="contained" color="primary">Submit</Button>
                    </Link>}
                    {authedUserAnswer && <Link to={`/result/${id}`}>
                        <Button variant="contained" color="secondary">View Result</Button>
                    </Link>}
                    <Typography variant="body1">Once answered, poll cannot be resubmitted</Typography>
                    </CardActions>
                </form>
                </div>
            </div>
            </Card>
        </div>
    )
}

const mapStateToProps = ({ questions, users, authedUser }, {id}) => {
    const question = questions[id];
    const qid = question.id;
    const authedUserAnswer = users[authedUser].answers[id];
    return {
        question,
        users,
        authedUserAnswer,
        qid,
        authedUser,
    }
}

export default connect(mapStateToProps, {handleSaveQuestionAnswer})(Poll);
