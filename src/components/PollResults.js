import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { 
    Card, CardContent, Typography, Avatar,
    LinearProgress,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '50rem',
          },
    },
    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2rem',
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
                width: '30rem',
              },
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
    progressBar: {
        height: 15
      },
    progressContainer: {
        border: `1px solid #f5f5f5`,
        padding: '1rem',
        borderRadius: '5px',
        background: '#f5f5f5',
        marginTop: '0.5rem',
    },
    userVoteContainer: {
        display: 'flex',
        float: 'right',
        marginTop: '1rem',
        marginRight: '0.8rem',
        color: '#0aa27f',
        '& svg': {
            fill: 'gold',
        },
    },
  }));

const PollResults = ({question, users, user}) => {
    const classes = useStyles();
    const { optionOne, optionTwo } = question
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    const optionOnePercent = ((optionOneVotes / totalVotes) * 100).toFixed();
    const optionTwoPercent = ((optionTwoVotes / totalVotes) * 100).toFixed();

    return (
        <div className={classes.container}>
            <Card className={classes.root} variant="outlined">
                <Typography className={classes.authorAsks} variant="h6" component="h2">
                    Asked by: {users[question.author].name}
                </Typography>
                <div className={classes.contentRoot}>
                    <Avatar alt="user avatar" src={users[question.author].avatarURL} className={classes.large} />
                    <div className={classes.contentContainer}>
                        <CardContent>                        
                            <Typography variant="h6" component="h3">
                                Result
                            </Typography>
                            <>
                                {userVote === "optionOne" && 
                                        <span className={classes.userVoteContainer}>
                                            <StarIcon />
                                            <Typography>Your vote</Typography>
                                        </span>
                                    }
                                <div className={classes.progressContainer}>
                                    <Typography>{optionOne.text}</Typography>
                                    <LinearProgress className={classes.progressBar} variant="determinate" value={parseInt(optionOnePercent)} />
                                    <Typography>{optionOnePercent}%</Typography>
                                    <Typography>{optionOneVotes} out of {totalVotes} votes</Typography>
                                </div>
                            </>
                            <>
                                {userVote === "optionTwo" && 
                                        <span className={classes.userVoteContainer}>
                                            <StarIcon />
                                            <Typography>Your vote</Typography>
                                        </span>
                                    }
                                <div className={classes.progressContainer}>
                                    <Typography>{optionTwo.text}</Typography>
                                    <LinearProgress className={classes.progressBar} variant="determinate" value={parseInt(optionTwoPercent)} />
                                    <Typography>{optionTwoPercent}%</Typography>
                                    <Typography>{optionTwoVotes} out of {totalVotes} votes</Typography>
                                </div>
                            </>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    )
}

const mapStateToProps = ({ questions, users, authedUser }, {id}) => {
    const question = questions[id];
    const user = users[authedUser]
    return {
        question,
        users,
        user,
        authedUser,
    }
}

export default connect(mapStateToProps)(PollResults);
